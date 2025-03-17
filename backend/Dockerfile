FROM python:3.9-slim

WORKDIR /app

# Copy the requirements file
COPY backend/requirements.txt .
# If requirements.txt is in the root folder, use: COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Ensure port binding works
ENV PORT=5000

# Update if app.py is in a different location
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "backend.app:app"]
