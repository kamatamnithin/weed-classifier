from fastapi import FastAPI, UploadFile, File, HTTPException, Depends, Header, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
from pydantic import BaseModel

from ml_backend.model import get_model

# Rate limiting (slowapi)
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from fastapi.responses import JSONResponse

limiter = Limiter(key_func=get_remote_address)


app = FastAPI(title="Weed Classifier API")
app.state.limiter = limiter
app.add_exception_handler(429, _rate_limit_exceeded_handler)

# Allow local dev frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = os.environ.get('ML_API_KEY') or ''

class PredictResponse(BaseModel):
    prediction: str
    confidence: float

async def verify_api_key(x_api_key: str = Header(None)):
    if not API_KEY:
        # If no API key set, allow (dev convenience)
        return True
    if x_api_key != API_KEY:
        raise HTTPException(status_code=401, detail='Invalid API key')
    return True

@app.on_event("startup")
async def startup_event():
    # load model singleton
    get_model()

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/predict", response_model=PredictResponse)
@limiter.limit("20/minute")
async def predict(request: Request, file: UploadFile = File(...), authorized: bool = Depends(verify_api_key)):
    # Basic request validation
    if file.content_type.split('/')[0] != 'image':
        raise HTTPException(status_code=400, detail='File must be an image')

    # Limit file size ~ 10MB
    data = await file.read()
    if len(data) > 10 * 1024 * 1024:
        raise HTTPException(status_code=413, detail='File too large')

    model = get_model()
    try:
        label, confidence = model.predict_from_bytes(data)
        return {"prediction": label, "confidence": confidence}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference failed: {e}")

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
