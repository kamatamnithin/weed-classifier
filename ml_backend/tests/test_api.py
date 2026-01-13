import io

import pytest
from fastapi.testclient import TestClient

from ml_backend.app import app

client = TestClient(app)

def test_health():
    r = client.get('/health')
    assert r.status_code == 200
    assert r.json()['status'] == 'ok'

@pytest.mark.parametrize('path', [
    'ml_backend/data/Fat Hen/1.png'
])
def test_predict(path):
    with open(path, 'rb') as f:
        files = {'file': ('1.png', f, 'image/png')}
        r = client.post('/predict', files=files)
        assert r.status_code in (200, 401, 429)
