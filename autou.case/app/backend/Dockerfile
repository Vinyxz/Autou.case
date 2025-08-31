# Usar uma imagem base do Python
FROM python:3.9-slim

# Definir o diretório de trabalho no contêiner
WORKDIR /app

# Copiar o arquivo de dependências para o contêiner
COPY app/backend/requirements.txt /app/requirements.txt

# Instalar as dependências
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copiar o código da aplicação para o contêiner
COPY app/backend/ /app/

# Expor a porta onde o backend estará rodando
EXPOSE 5001

# Comando para rodar o Gunicorn com o Uvicorn
CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:5001", "app:app"]
