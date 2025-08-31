
FROM python:3.9-slim


WORKDIR /app


COPY app/backend/requirements.txt /app/requirements.txt


RUN pip install --no-cache-dir -r /app/requirements.txt

COPY app/backend/ /app/


EXPOSE 5001


CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:5001", "app:app"]



