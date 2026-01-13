import argparse
import os
from pathlib import Path
from tqdm import tqdm

import torch
from torch import nn, optim
from torch.utils.data import DataLoader, Dataset
from torchvision import datasets, transforms, models

# We'll map dataset class names to binary labels: crops -> 1, weeds -> 0
DEFAULT_CROP_CLASSES = ["Maize", "Common wheat", "Sugar beet"]

class BinaryImageFolder(Dataset):
    def __init__(self, root, crop_classes=None, transform=None):
        self.crop_classes = crop_classes or DEFAULT_CROP_CLASSES
        self.dataset = datasets.ImageFolder(root, transform=transform)
        # Map class index to name
        self.class_to_idx = {c: i for i, c in enumerate(self.dataset.classes)}
        # Build a mapping from index to binary label
        self.idx_to_label = []
        for cls_name in self.dataset.classes:
            label = 1 if cls_name in self.crop_classes else 0
            self.idx_to_label.append(label)

    def __len__(self):
        return len(self.dataset)

    def __getitem__(self, idx):
        img, cls_idx = self.dataset[idx]
        binary_label = self.idx_to_label[cls_idx]
        return img, binary_label


def train(data_dir, epochs=4, batch_size=32, lr=1e-4, out='checkpoints/model.pt', val_split=0.2):
    transform = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])

    # Prepare a clean dataset directory containing only class folders with images
    import shutil
    def prepare_clean_dataset(src, dst):
        os.makedirs(dst, exist_ok=True)
        for cls in os.listdir(src):
            cls_path = os.path.join(src, cls)
            if not os.path.isdir(cls_path):
                continue
            files = [f for f in os.listdir(cls_path) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
            if files:
                dst_cls = os.path.join(dst, cls)
                os.makedirs(dst_cls, exist_ok=True)
                for f in files:
                    shutil.copy(os.path.join(cls_path, f), os.path.join(dst_cls, f))
        return dst

    clean_dir = os.path.join(os.path.dirname(__file__), 'data_clean')
    if os.path.exists(clean_dir):
        shutil.rmtree(clean_dir)
    prepare_clean_dataset(data_dir, clean_dir)

    # Load full dataset and split into train/val
    full_dataset = datasets.ImageFolder(clean_dir, transform=transform)
    num_samples = len(full_dataset)
    indices = list(range(num_samples))
    split = int(val_split * num_samples)

    if split <= 0:
        train_idx = indices
        val_idx = []
    else:
        from sklearn.model_selection import train_test_split
        train_idx, val_idx = train_test_split(indices, test_size=val_split, stratify=[full_dataset.targets[i] for i in indices])

    from torch.utils.data import Subset
    train_ds = Subset(full_dataset, train_idx)
    val_ds = Subset(full_dataset, val_idx)

    train_loader = DataLoader(train_ds, batch_size=batch_size, shuffle=True, num_workers=2)
    val_loader = DataLoader(val_ds, batch_size=batch_size, shuffle=False, num_workers=2) if len(val_ds) > 0 else None

    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = models.resnet18(pretrained=True)
    in_features = model.fc.in_features
    model.fc = nn.Linear(in_features, 2)
    model = model.to(device)

    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=lr)

    best_val_acc = 0.0
    os.makedirs(os.path.dirname(out), exist_ok=True)
    metrics_dir = os.path.join(os.path.dirname(__file__), 'metrics')
    os.makedirs(metrics_dir, exist_ok=True)

    for epoch in range(epochs):
        model.train()
        running = 0.0
        total = 0
        correct = 0
        pbar = tqdm(enumerate(train_loader), total=len(train_loader))
        for i, (x, y) in pbar:
            x = x.to(device)
            y = y.to(device)
            optimizer.zero_grad()
            logits = model(x)
            loss = criterion(logits, y)
            loss.backward()
            optimizer.step()

            running += loss.item()
            preds = logits.argmax(1)
            correct += (preds == y).sum().item()
            total += y.size(0)
            pbar.set_description(f"Epoch {epoch+1}/{epochs} - Loss {running/(i+1):.4f} Acc {correct/total:.4f}")

        # Save last checkpoint
        torch.save(model.state_dict(), out)
        print(f"Saved checkpoint to {out}")

        # Evaluate on validation set
        if val_loader:
            model.eval()
            import numpy as np
            from sklearn.metrics import confusion_matrix, classification_report
            all_preds = []
            all_labels = []
            with torch.no_grad():
                for x, y in val_loader:
                    x = x.to(device)
                    logits = model(x)
                    preds = logits.argmax(1).cpu().numpy()
                    all_preds.extend(preds.tolist())
                    all_labels.extend(y.numpy().tolist())

            cm = confusion_matrix(all_labels, all_preds)
            report = classification_report(all_labels, all_preds, output_dict=True)
            val_acc = float((np.array(all_preds) == np.array(all_labels)).mean())

            metrics = {
                'epoch': epoch+1,
                'val_acc': val_acc,
                'confusion_matrix': cm.tolist(),
                'classification_report': report
            }

            import json
            metrics_path = os.path.join(metrics_dir, f'metrics_epoch_{epoch+1}.json')
            with open(metrics_path, 'w') as f:
                json.dump(metrics, f, indent=2)
            print(f"Saved metrics to {metrics_path}")

            # Save best model
            if val_acc > best_val_acc:
                best_val_acc = val_acc
                best_path = os.path.join(os.path.dirname(out), 'best_model.pt')
                torch.save(model.state_dict(), best_path)
                print(f"New best model saved to {best_path} (val_acc={best_val_acc:.4f})")


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--data-dir', required=True, help='Path to dataset (ImageFolder format)')
    parser.add_argument('--epochs', type=int, default=4)
    parser.add_argument('--batch-size', type=int, default=32)
    parser.add_argument('--lr', type=float, default=1e-4)
    parser.add_argument('--out', default='checkpoints/model.pt')
    args = parser.parse_args()

    train(args.data_dir, epochs=args.epochs, batch_size=args.batch_size, lr=args.lr, out=args.out)
