import os
import aiohttp
from fastapi import FastAPI, Request, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from PyPDF2 import PdfReader
from io import BytesIO
from typing import Dict


API_TOKEN = os.getenv("HUGGINGFACE_API_TOKEN")

API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-mnli"
HEADERS = {"Authorization": f"Bearer {API_TOKEN}"}

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def classify_text(text: str) -> Dict:
    """Envia o texto para a API da Hugging Face de forma assíncrona."""
    if not text or not text.strip():
        raise ValueError("O texto do e-mail não pode estar vazio.")
    
    payload = {
        "inputs": text,
        "parameters": {
            "candidate_labels": ["requer ação urgente", "não requer ação"],
            "multi_label": False,
        },
    }

    async with aiohttp.ClientSession() as session:
        async with session.post(API_URL, headers=HEADERS, json=payload, timeout=45) as response:
            if response.status != 200:
                error_details = await response.json()
                raise HTTPException(
                    status_code=response.status,
                    detail=f"Erro na API da Hugging Face: {error_details}",
                )
            return await response.json()

def generate_response(classification: Dict) -> str:
    """Gera uma resposta com base na classificação."""
    top_label = classification["labels"][0]
    
    if top_label == "requer ação urgente":
        return "Obrigado pelo seu e-mail. A sua mensagem foi recebida e será encaminhada para a equipa responsável. Entraremos em contacto em breve."
    elif top_label == "não requer ação":
        return "Sua mensagem foi recebida com sucesso. Agradecemos o contato e, caso seja necessário, retornaremos em breve."  
    else:
        return "Não foi possível determinar a categoria deste e-mail. A sua mensagem foi recebida."

@app.post("/classify")
async def process_email_endpoint(file: UploadFile = File(None), email_text: str = Form(None)):
    """Endpoint que recebe texto ou ficheiro para processamento."""
    try:
        final_email_text = ""
        if file:
            contents = await file.read()
            if file.filename.endswith(".txt"):
                final_email_text = contents.decode("utf-8")
            elif file.filename.endswith(".pdf"):
                pdf_file = BytesIO(contents)
                reader = PdfReader(pdf_file)
                for page in reader.pages:
                    final_email_text += page.extract_text()
            else:
                raise HTTPException(status_code=400, detail="Formato de ficheiro não suportado.")
        elif email_text:
            final_email_text = email_text

        if not final_email_text or not final_email_text.strip():
            raise HTTPException(status_code=400, detail="O conteúdo do e-mail está vazio.")

        classification = await classify_text(final_email_text)
        suggested_response = generate_response(classification)

        display_label = "produtivo" if classification["labels"][0] == "requer ação urgente" else "improdutivo"

        return {
            "classification": display_label,
            "scores": classification["scores"],
            "suggested_response": suggested_response,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno do servidor: {str(e)}")

@app.get("/")
async def root():
    """Endpoint de verificação para confirmar que o backend está a funcionar."""
    return {"message": "Backend funcionando corretamente"}


