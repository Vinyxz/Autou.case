Classificador de E-mails com IA - Case Prático AutoU #🚀 Sobre o Projeto#

Este projeto é uma solução web desenvolvida como parte do processo seletivo da AutoU. O objetivo é automatizar a triagem de e-mails, classificando-os em categorias predefinidas e dando respostas automáticas com base no seu conteúdo.

A utiliza aplicação Inteligência Artificial para analisar o texto de e-mails (seja colado diretamente, enviado como arquivo .txt ou .pdf) e classificá-lo como "produtivo" (requer ação) ou "improdutivo" (não requer ação), fornecendo uma sugestão de resposta para cada caso.

{ Funcionalidades Interface Intuitiva: Um design limpo e profissional, inspirado na identidade visual da AutoU.

Múltiplas Formas de Entrada:

Inserção direta de texto.

Upload de arquivos .txt e .pdf através de um clique.

Funcionalidade de arrastar e soltar (arrastar e soltar) para uma experiência de usuário moderna.

Classificação com IA: Utilize um modelo de linguagem avançado do Hugging Face para analisar e avaliar o conteúdo dos e-mails.

Respostas Sugeridas: Gera automaticamente uma resposta adequada à classificação do e-mail.

Arquitetura Escalável: Uma aplicação é totalmente containerizada com Docker, separando o frontend do backend para garantir escalabilidade e facilidade de manutenção.}

Tecnologias Utilizadas {A solução foi construída com tecnologias modernas e robustas, focando em desempenho e boas práticas de desenvolvimento.

Front-end:

HTML5 e CSS3

JavaScript (ES6+) para a lógica de interação e comunicação com o backend.

Tailwind CSS para estilização rápida e responsiva.

Backend:

Python 3.9 Slin

FastAPI para a construção de uma API de alto desempenho.

Aiohttp para realizar requisições assíncronas à API do Hugging Face.

PyPDF2 para remover texto de arquivos PDF.

Gunicorn e Uvicorn para servir a aplicação de forma robusta.

Inteligência Artificial:

API de inferência de rostos abraçados

Modelo: facebook/bart-large-mnli (um modelo robusto para classificação de texto).

Containerização e Orquestração:

Docker

Docker Compose}

Estrutura do Projeto O repositório está organizado da seguinte forma:

autou.case/ ├── app/ │ ├── backend/ │ │ ├── app.py # Lógica principal da API com FastAPI │ │ ├── requisitos.txt # Dependências do Python │ │ └── Dockerfile # Instruções para construir a imagem do backend │ └── frontend/ │ ├── index.html # Estrutura da página │ ├── script.js # Lógica do frontend │ └── estilos.css # Estilos adicionais ├── docker-compose.yml # Orquestra dos serviços de front-end e back-end └── README.md # Este arquivo

Como Executar Localmente Para executar a aplicação em sua máquina, siga os passos abaixo.

Pré-requisitos do Docker instalados e executados em sua máquina.

Passos de Instalação Clone ou repositório:

git clone https://github.com/Vinyxz/Autou.case.git cd autou.case

Chore o arquivo do ambiente:

Dentro da pasta app/backend/, crie um arquivo chamado .env.

Dentro deste arquivo, adicione sua chave da API do Hugging Face, da seguinte forma:

HUGGINGFACE_API_TOKEN=hf_SUA_CHAVE_AQUI

Início da Aplicação:

Na pasta raiz do projeto (autou.case/), execute o seguinte comando no seu terminal:

docker-compose up --build, para subir todos os contêineres e testar a aplicação.
