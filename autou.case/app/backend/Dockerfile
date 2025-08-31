
FROM python:3.9-slim


WORKDIR /app


COPY requirements.txt .


RUN pip install --no-cache-dir -r requirements.txt


COPY . .

# --- A MUDANÇA MAIS IMPORTANTE ESTÁ AQUI ---
# Em vez de um comando fixo, tornamo-lo flexível.
# Ele irá usar a porta que a Render definir na variável de ambiente $PORT.
# Se a variável $PORT não existir (como no seu PC), ele usará 5001 como padrão.
CMD gunicorn -k uvicorn.workers.UvicornWorker -b 0.0.0.0:${PORT:-5001} app:app

