# Use a imagem nginx para servir os arquivos estáticos
FROM nginx:alpine

# Copiar os arquivos da aplicação frontend para o diretório do nginx
COPY ./ /usr/share/nginx/html

# Expor a porta para acessar o frontend
EXPOSE 80
