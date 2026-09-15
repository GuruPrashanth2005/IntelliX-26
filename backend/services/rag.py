import os
import json
import re
from groq import Groq
import google.generativeai as genai
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance, PointStruct
from llama_index.core.node_parser import SentenceSplitter
from dotenv import load_dotenv

load_dotenv()

# Initialize Qdrant Client (Persistent storage so vectors survive server restarts)
qdrant_client = QdrantClient(path="./qdrant_data")

# Configure Groq (for text generation/verification)
groq_client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

# Configure Gemini (for embeddings)
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

EMBEDDING_DIM = 768 # Gemini embedding-001 uses 768 dimensions

def init_collection(collection_name: str):
    if not qdrant_client.collection_exists(collection_name):
        qdrant_client.create_collection(
            collection_name=collection_name,
            vectors_config=VectorParams(size=EMBEDDING_DIM, distance=Distance.COSINE)
        )

def ingest_material(material_id: int, content: str):
    collection_name = f"material_{material_id}"
    init_collection(collection_name)
    
    # 1. Chunking
    splitter = SentenceSplitter(chunk_size=512, chunk_overlap=50)
    chunks = splitter.split_text(content)
    
    # 2. Embedding & Storage using Gemini API
    points = []
    for idx, chunk in enumerate(chunks):
        response = genai.embed_content(
            model="models/embedding-001",
            content=chunk,
            task_type="retrieval_document",
        )
        embedding = response['embedding']
        
        points.append(
            PointStruct(
                id=idx,
                vector=embedding,
                payload={"text": chunk}
            )
        )
        
    if points:
        qdrant_client.upsert(
            collection_name=collection_name,
            points=points
        )
    print(f"Ingested {len(points)} chunks into {collection_name}")

def verify_answer(material_id: int, question: str, answer: str) -> dict:
    collection_name = f"material_{material_id}"
    
    # Check if collection exists
    if not qdrant_client.collection_exists(collection_name):
        return {
            "status": "error",
            "message": "Material has not been processed for RAG yet.",
            "overall_label": "NOT FOUND",
            "explanation": "No material chunks available."
        }
    
    # 1. Embed Answer for Retrieval using Gemini API
    response = genai.embed_content(
        model="models/embedding-001",
        content=answer,
        task_type="retrieval_query",
    )
    query_vector = response['embedding']
    
    # 2. Retrieve top-3 chunks
    search_results = qdrant_client.query_points(
        collection_name=collection_name,
        query=query_vector,
        limit=3
    ).points
    
    if not search_results:
        return {
            "status": "success",
            "message": "Verification complete.",
            "overall_label": "NOT FOUND",
            "explanation": "No relevant evidence was found in the source material."
        }
    
    # Combine retrieved chunks into evidence premise
    evidence_text = "\n\n".join([f"Chunk {i+1}:\n{hit.payload['text']}" for i, hit in enumerate(search_results)])
    
    # 3. Verification using Groq
    prompt = f"""You are an intelligent educational AI assistant.
Your task is to verify a student's answer against the provided supported material.

Supported Material (Context):
{evidence_text}

Question: {question}
Student's Answer: {answer}

Analyze the supported material. Does the material support the logic and meaning of the student's answer?
IMPORTANT RULE: You MUST evaluate the answer STRICTLY based on the provided Supported Material. DO NOT use your outside knowledge. If an answer is factually correct in the real world but the information is NOT present in the Supported Material, you MUST classify it as NOT_FOUND.

Determine the result out of these 4 options:
- SUPPORTED: The answer is comprehensively correct and highly detailed. It covers ALL necessary concepts, mechanisms, and context expected for a complete answer, fully supported by the material.
- PARTIALLY_SUPPORTED: The answer is factually correct but too brief, misses important contextual details (e.g., missing key reactants, products, or steps), OR contains a mix of correct and incorrect facts. Be very strict: if it lacks depth, mark it as PARTIALLY_SUPPORTED.
- CONTRADICTED: The answer is factually incorrect and contradicts the material.
- NOT_FOUND: The material does not contain enough information to evaluate the answer.

Explain your reasoning by comparing the student's answer with the provided material. State exactly what they got right and what they got wrong.

Respond ONLY with a valid JSON object in the following format:
{{
    "overall_label": "SUPPORTED" | "PARTIALLY_SUPPORTED" | "CONTRADICTED" | "NOT_FOUND",
    "explanation": "Your detailed comparison and explanation here."
}}
"""
    try:
        chat_completion = groq_client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="qwen/qwen3.8-27b",
            temperature=0,
            response_format={"type": "json_object"}
        )
        
        raw_text = chat_completion.choices[0].message.content.strip()
        result_data = json.loads(raw_text)
        
        return {
            "status": "success",
            "message": "Verification complete.",
            "overall_label": result_data.get("overall_label", "NOT FOUND"),
            "explanation": result_data.get("explanation", "Verification failed to generate an explanation.")
        }
        
    except Exception as e:
        print(f"Verification error: {e}")
        return {
            "status": "error",
            "message": "Failed to verify answer",
            "overall_label": "ERROR",
            "explanation": str(e)
        }

def extract_questions_with_ai(raw_text: str) -> list[str]:
    """
    Uses Groq to extract a list of questions from raw text (handles broken lines, PDFs, etc).
    """
    prompt = f"""
    You are an intelligent document parser. Your job is to extract all the educational questions from the following text.
    The text might contain weird formatting, bullet points, numbering, hidden line breaks, or half-sentences on new lines because it was extracted from a PDF.
    
    1. Reconstruct any broken questions into single, grammatically correct sentences.
    2. Remove numbers or bullet points (e.g. "1. What is..." -> "What is...").
    
    Respond ONLY with a valid JSON object containing an array of strings under the key "questions".
    Example:
    {{
        "questions": [
            "What is photosynthesis?",
            "Explain the theory of relativity."
        ]
    }}
    
    TEXT:
    {raw_text}
    """
    try:
        chat_completion = groq_client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="qwen/qwen3.8-27b",
            temperature=0,
            response_format={"type": "json_object"}
        )
        
        raw_text = chat_completion.choices[0].message.content.strip()
        data = json.loads(raw_text)
        questions = data.get("questions", [])
        
        if isinstance(questions, list):
            return questions
        return []
    except Exception as e:
        print(f"Error extracting questions with AI: {e}")
        return []
