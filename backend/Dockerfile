FROM python:3.9-slim

WORKDIR /app

COPY backend/requirements.txt .  # Change to COPY requirements.txt . if needed
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PORT=5000  # Ensure port binding works

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "backend.app:app"]  # Update if app.py is in a different location
