FROM python:3.11-slim
WORKDIR /app

# Install system deps for pillow and torch (minimal)
RUN apt-get update && apt-get install -y libgl1 libglib2.0-0 && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy app
COPY . /app

# Expose port 8000 - uvicorn inside the container runs on 8000
EXPOSE 8000

ENV ML_API_KEY=""

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
