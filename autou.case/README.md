*Classificador de E-mails com IA - Case Prático AutoU*
#🚀 Sobre o Projeto#

Este projeto é uma solução web desenvolvida como parte do processo seletivo da AutoU. O objetivo é automatizar a triagem de e-mails, classificando-os em categorias predefinidas e sugerindo respostas automáticas com base no seu conteúdo.

A aplicação utiliza Inteligência Artificial para analisar o texto de e-mails (seja colado diretamente, enviado como ficheiro .txt ou .pdf) e classificá-lo como "produtivo" (requer ação) ou "improdutivo" (não requer ação), fornecendo uma sugestão de resposta apropriada para cada caso.

{*Funcionalidades*
Interface Intuitiva: Um design limpo e profissional, inspirado na identidade visual da AutoU.

Múltiplas Formas de Entrada:

Inserção direta de texto.

Upload de ficheiros .txt e .pdf através de um clique.

Funcionalidade de arrastar e soltar (drag and drop) para uma experiência de utilizador moderna.

Classificação com IA: Utiliza um modelo de linguagem avançado da Hugging Face para analisar e classificar o conteúdo dos e-mails.

Respostas Sugeridas: Gera automaticamente uma resposta adequada à classificação do e-mail.

Arquitetura Escalável: A aplicação é totalmente containerizada com Docker, separando o frontend do backend para garantir escalabilidade e facilidade de manutenção.}

*Tecnologias Utilizadas*
{A solução foi construída com tecnologias modernas e robustas, focando em performance e boas práticas de desenvolvimento.

Frontend:

HTML5 e CSS3

JavaScript (ES6+) para a lógica de interação e comunicação com o backend.

Tailwind CSS para a estilização rápida e responsiva.

Backend:

Python 3.9Slin

FastAPI para a construção de uma API de alta performance.

Aiohttp para realizar requisições assíncronas à API da Hugging Face.

PyPDF2 para a extração de texto de ficheiros PDF.

Gunicorn e Uvicorn para servir a aplicação de forma robusta.

Inteligência Artificial:

Hugging Face Inference API

Modelo: facebook/bart-large-mnli (um modelo robusto para classificação de texto).

Containerização e Orquestração:

Docker

Docker Compose}

*Estrutura do Projeto*
O repositório está organizado da seguinte forma:

autou.case/
├── app/
│   ├── backend/
│   │   ├── app.py          # Lógica principal da API com FastAPI
│   │   ├── requirements.txt  # Dependências do Python
│   │   └── Dockerfile        # Instruções para construir a imagem do backend
│   └── frontend/
│       ├── index.html        # Estrutura da página
│       ├── script.js         # Lógica do frontend
│       └── styles.css        # Estilos adicionais
├── docker-compose.yml      # Orquestra os serviços de frontend e backend
└── README.md               # Este ficheiro

*Como Executar Localmente*
Para executar a aplicação na sua máquina, siga os passos abaixo.

Pré-requisitos
Docker instalado e a ser executado na sua máquina.

Passos de Instalação
Clone o repositório:

git clone [https://github.com/seu-usuario/autou.case.git](https://github.com/Vinyxz/AutoU.AI.git)
cd autou.case

Crie o ficheiro de ambiente:

Dentro da pasta app/backend/, crie um ficheiro chamado .env.

Dentro deste ficheiro, adicione a sua chave da API da Hugging Face, da seguinte forma:

HUGGINGFACE_API_TOKEN=hf_SUA_CHAVE_AQUI

Inicie a Aplicação:

Na pasta raiz do projeto (autou.case/), execute o seguinte comando no seu terminal:

docker-compose up --build, para subir todos os conteners e testar a aplicação.
 
