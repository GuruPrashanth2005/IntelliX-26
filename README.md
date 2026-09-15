# Educational Answer Grounding Checker

This project verifies whether an AI-generated answer is strictly grounded in user-provided study material.

## Project Structure
- `backend/`: FastAPI application containing the verification pipeline (future: PyMuPDF, Qdrant, DeBERTa, Gemini).
- `frontend/`: Next.js frontend built with React, TypeScript, Tailwind CSS, and shadcn/ui.

## Current State
**Stage 1 - Foundation:** The project scaffolding is complete. The frontend contains a responsive form for the Question, Source, and Answer. The backend has the `/verify` endpoint built out with Pydantic schemas. 

*Note: The actual RAG pipeline and AI verification are currently mocked (returning a placeholder "NOT IMPLEMENTED" response) and will be integrated in Stage 2.*

## Running the Application Locally

### 1. Backend (FastAPI)
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Activate the virtual environment:
   ```bash
   # Windows
   .\venv\Scripts\Activate
   
   # Mac/Linux
   source venv/bin/activate
   ```
3. Copy `.env.example` to `.env` and add your API keys.
4. Run the server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
The backend API will be available at http://localhost:8000.

### 2. Frontend (Next.js)
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
The frontend application will be available at http://localhost:3000.
