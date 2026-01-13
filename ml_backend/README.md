# ML Backend (FastAPI + PyTorch)

This folder contains a minimal FastAPI service that hosts a binary "Weed vs Crop" classifier using PyTorch.

Quick start (local):

1. Create and activate a Python venv (recommended):

```bash
python -m venv .venv
source .venv/bin/activate   # on Windows: .venv\Scripts\Activate.ps1 (PowerShell)
```

2. Install requirements:

```bash
pip install -r requirements.txt
```

3. (Optional) Train a model using your dataset (ImageFolder format):

```bash
python train.py --data-dir ../v2-plant-seedlings-dataset --epochs 4 --batch-size 32
```

4. Run the API server:

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

API endpoints:
- GET /health → {"status": "ok"}
- POST /predict (multipart/form-data with key `file`) → {"prediction":"Weed"|"Crop","confidence":0.98}

Docker:
- Build: docker build -t weed-classifier:latest .
- Run: docker run -p 8000:8000 weed-classifier:latest
