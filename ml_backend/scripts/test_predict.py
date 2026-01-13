# Manual test script (rename this file or run directly) - not executed by pytest
# Usage: python ml_backend/scripts/test_predict_manual.py
import requests
url = 'http://localhost:8001/predict'
path = 'ml_backend/data/Fat Hen/1.png'
with open(path, 'rb') as f:
    files = {'file': ('1.png', f, 'image/png')}
    try:
        r = requests.post(url, files=files)
        print('status', r.status_code)
        try:
            print('json', r.json())
        except Exception:
            print('text', r.text)
    except Exception as e:
        print('Request failed:', e)
