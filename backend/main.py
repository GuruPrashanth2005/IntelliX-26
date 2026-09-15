from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

import models
import schemas
from database import engine, get_db
from services import rag
import fitz  # PyMuPDF
import docx
import io

# Create the database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Educational Answer Grounding Checker",
    description="API for verifying if an AI-generated answer is grounded in source material.",
    version="0.1.0"
)

# Configure CORS for local Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "edu-grounding-checker-api"}

def extract_text_from_file(file: UploadFile) -> str:
    content = file.file.read()
    if file.filename.endswith(".pdf"):
        doc = fitz.open(stream=content, filetype="pdf")
        text = "\n".join([page.get_text() for page in doc])
        return text
    elif file.filename.endswith(".docx"):
        doc = docx.Document(io.BytesIO(content))
        text = "\n".join([p.text for p in doc.paragraphs])
        return text
    else:
        # Fallback to plain text decoding
        return content.decode("utf-8", errors="ignore")

@app.post("/api/upload", response_model=schemas.Material)
def upload_material(
    background_tasks: BackgroundTasks,
    title: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    text_content = extract_text_from_file(file)
    if not text_content.strip():
        raise HTTPException(status_code=400, detail="Could not extract text from the file.")
    
    db_material = models.Material(title=title, content=text_content)
    db.add(db_material)
    db.commit()
    db.refresh(db_material)
    
    # Trigger RAG ingestion in the background so the UI doesn't freeze
    background_tasks.add_task(rag.ingest_material, db_material.id, db_material.content)
    
    return db_material

@app.post("/api/materials", response_model=schemas.Material)
def create_material(material: schemas.MaterialCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    db_material = models.Material(title=material.title, content=material.content)
    db.add(db_material)
    db.commit()
    db.refresh(db_material)
    
    # Trigger RAG ingestion in the background so the UI doesn't freeze
    background_tasks.add_task(rag.ingest_material, db_material.id, db_material.content)
    
    return db_material

@app.get("/api/materials", response_model=List[schemas.Material])
def get_materials(db: Session = Depends(get_db)):
    return db.query(models.Material).all()

@app.post("/api/materials/{material_id}/questions", response_model=schemas.Question)
def create_question(material_id: int, question: schemas.QuestionCreate, db: Session = Depends(get_db)):
    db_material = db.query(models.Material).filter(models.Material.id == material_id).first()
    if not db_material:
        raise HTTPException(status_code=404, detail="Material not found")
    
    db_question = models.Question(material_id=material_id, question_text=question.question_text)
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question

@app.post("/api/materials/{material_id}/questions/upload")
def upload_questions(material_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    db_material = db.query(models.Material).filter(models.Material.id == material_id).first()
    if not db_material:
        raise HTTPException(status_code=404, detail="Material not found")
        
    text_content = extract_text_from_file(file)
    if not text_content.strip():
        raise HTTPException(status_code=400, detail="Could not extract text from the file.")
        
    # Use AI to intelligently extract questions from the raw text
    extracted_questions = rag.extract_questions_with_ai(text_content)
    
    if not extracted_questions:
        # Fallback to manual line split if AI fails or returns empty
        extracted_questions = [line.strip() for line in text_content.split("\n") if len(line.strip()) > 5]
    
    added_questions = []
    for q_text in extracted_questions:
        db_question = models.Question(material_id=material_id, question_text=q_text)
        db.add(db_question)
        added_questions.append(db_question)
            
    db.commit()
    return {"message": f"Successfully added {len(added_questions)} questions."}

@app.get("/api/questions", response_model=List[schemas.Question])
def get_all_questions(db: Session = Depends(get_db)):
    return db.query(models.Question).all()

@app.post("/api/verify", response_model=schemas.VerificationResponse)
def verify_answer(request: schemas.VerificationRequest, db: Session = Depends(get_db)):
    db_question = db.query(models.Question).filter(models.Question.id == request.question_id).first()
    if not db_question:
        raise HTTPException(status_code=404, detail="Question not found")
    
    # Execute RAG semantic search and verification using DeBERTa
    result = rag.verify_answer(db_question.material_id, db_question.question_text, request.answer)
    
    return schemas.VerificationResponse(
        status=result["status"],
        message=result["message"],
        overall_label=result["overall_label"],
        explanation=result["explanation"]
    )