import io
from typing import Tuple, List

from PIL import Image
import torch
import torchvision.transforms as T
import torchvision.models as models
import os

DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Binary mapping: these class names are considered crops; others are treated as weeds.
DEFAULT_CROP_CLASSES = ["Maize", "Common wheat", "Sugar beet"]

class ModelWrapper:
    def __init__(self, checkpoint_path: str = "checkpoints/model.pt", crop_classes: List[str] = None):
        self.checkpoint_path = checkpoint_path
        self.crop_classes = crop_classes or DEFAULT_CROP_CLASSES
        self.model = self._build_model()
        self.model.to(DEVICE)
        self.model.eval()

        # If checkpoint exists, try to load
        if os.path.exists(self.checkpoint_path):
            try:
                state = torch.load(self.checkpoint_path, map_location=DEVICE)
                self.model.load_state_dict(state)
                print(f"Loaded model from {self.checkpoint_path}")
            except Exception as e:
                print(f"Warning: failed to load checkpoint {self.checkpoint_path}: {e}")

        self.transforms = T.Compose([
            T.Resize(256),
            T.CenterCrop(224),
            T.ToTensor(),
            T.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])

    def _build_model(self):
        # Use a lightweight ResNet18 for quick inference
        model = models.resnet18(pretrained=True)
        in_features = model.fc.in_features
        model.fc = torch.nn.Linear(in_features, 2)
        return model

    def _preprocess(self, image: Image.Image) -> torch.Tensor:
        if image.mode != 'RGB':
            image = image.convert('RGB')
        return self.transforms(image)

    def predict_from_bytes(self, data: bytes) -> Tuple[str, float]:
        image = Image.open(io.BytesIO(data))
        x = self._preprocess(image).unsqueeze(0).to(DEVICE)

        with torch.no_grad():
            logits = self.model(x)
            probs = torch.nn.functional.softmax(logits, dim=1).cpu().numpy()[0]

        # We define index 0 = Weed, index 1 = Crop
        pred_index = int(probs.argmax())
        confidence = float(probs[pred_index])
        label = 'Crop' if pred_index == 1 else 'Weed'
        return label, confidence

# Singleton instance for FastAPI to use
_model_instance: ModelWrapper = None

def get_model() -> ModelWrapper:
    global _model_instance
    if _model_instance is None:
        _model_instance = ModelWrapper()
    return _model_instance
