import argparse
import json
import os
from pathlib import Path

import torch
from torchvision import transforms, datasets, models
from torch.utils.data import DataLoader
from sklearn.metrics import confusion_matrix, classification_report
import numpy as np

parser = argparse.ArgumentParser()
parser.add_argument('--data-dir', required=True, help='Path to dataset (ImageFolder format)')
parser.add_argument('--checkpoint', default='checkpoints/best_model.pt')
args = parser.parse_args()

transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

dataset = datasets.ImageFolder(args.data_dir, transform=transform)
loader = DataLoader(dataset, batch_size=32, shuffle=False)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = models.resnet18(pretrained=True)
model.fc = torch.nn.Linear(model.fc.in_features, 2)
model.to(device)

ckpt = args.checkpoint
if not os.path.exists(ckpt):
    raise RuntimeError(f'Checkpoint not found: {ckpt}')

state = torch.load(ckpt, map_location=device)
model.load_state_dict(state)
model.eval()

all_preds = []
all_labels = []
with torch.no_grad():
    for x, y in loader:
        x = x.to(device)
        logits = model(x)
        preds = logits.argmax(1).cpu().numpy()
        all_preds.extend(preds.tolist())
        all_labels.extend(y.numpy().tolist())

cm = confusion_matrix(all_labels, all_preds)
report = classification_report(all_labels, all_preds, output_dict=True)
acc = float((np.array(all_preds) == np.array(all_labels)).mean())

out = {
    'accuracy': acc,
    'confusion_matrix': cm.tolist(),
    'classification_report': report
}
print(json.dumps(out, indent=2))
