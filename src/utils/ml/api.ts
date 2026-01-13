export async function getPredictionFromAPI(imageDataUrl: string) {
  // imageDataUrl is like 'data:image/jpeg;base64,...'
  const res = await fetch(imageDataUrl);
  const blob = await res.blob();

  const fd = new FormData();
  fd.append('file', blob, 'upload.jpg');

  const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8001';

  const resp = await fetch(`${API_URL}/predict`, {
    method: 'POST',
    body: fd,
    // Pass API key header if set in env (VITE_ML_API_KEY)
    headers: import.meta.env.VITE_ML_API_KEY ? { 'x-api-key': import.meta.env.VITE_ML_API_KEY } : undefined
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Server error: ${resp.status} ${text}`);
  }

  return resp.json();
}
