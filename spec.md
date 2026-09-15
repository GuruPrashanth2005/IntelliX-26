# Educational Answer Grounding Checker

## 1. Project Overview

The Educational Answer Grounding Checker is a web application that evaluates whether a submitted answer is supported by user-provided educational material.

The system uses Retrieval-Augmented Generation (RAG) techniques to retrieve relevant source chunks and a verification model to compare the answer with the retrieved evidence.

For each submitted answer, the system returns exactly one overall label:

- `SUPPORTED`
- `CONTRADICTED`
- `NOT FOUND`

The system checks grounding in the supplied material. It does not claim to determine universal truth.

## 2. Problem Statement

AI-generated educational answers may contain inaccurate information or claims that are not supported by the study material. Manually checking answers against lengthy documents can be time-consuming.

This project aims to automate that checking process by retrieving relevant evidence from user-provided material and comparing it with a submitted answer. The system produces one overall classification and a concise explanation based on the available evidence.

## 3. Goals

- Accept a question, source material, and answer.
- Split source material into searchable chunks.
- Retrieve relevant chunks using semantic search.
- Compare the submitted answer with the retrieved evidence.
- Return one overall classification.
- Show the evidence and explanation behind the result.
- Avoid treating missing evidence as proof that a claim is false.

## 4. User Inputs

The user provides:

1. **Question** — the question the answer is intended to address.
2. **Source Material** — text or an uploaded educational document.
3. **Answer to Verify** — the answer to evaluate.

## 5. Output

The system returns one final label:

| Label | Meaning |
|---|---|
| `SUPPORTED` | The retrieved source evidence supports the answer. |
| `CONTRADICTED` | The retrieved source evidence conflicts with the answer. |
| `NOT FOUND` | The source does not provide sufficient evidence to support or contradict the answer. |

The result may also include a short explanation and the relevant source evidence. These details support the single label; they are not additional classifications.

## 6. Technology Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- TanStack Query

### Backend
- Python
- FastAPI
- Pydantic

### Document Processing
- PyMuPDF for PDF text extraction
- python-docx for DOCX text extraction
- spaCy for sentence splitting
- LlamaIndex text splitters for chunking

### Retrieval and Verification
- Embedding model: `BAAI/bge-small-en-v1.5`
- Vector store: FAISS for the initial local prototype
- Optional reranker: `BAAI/bge-reranker-base`
- Verification model: `MoritzLaurer/DeBERTa-v3-base-mnli-fever-anli`
- Optional LLM fallback: OpenAI GPT-4.1 mini
- Orchestration: LlamaIndex

### Storage and Deployment
- PostgreSQL for persistent application data, if required
- Docker for packaging and deployment
- Git and GitHub for version control

## 7. System Architecture

```text
Next.js Frontend
       |
       v
FastAPI Backend
       |
       v
Extract and clean source text
       |
       v
Split source into chunks
       |
       v
Generate chunk embeddings
       |
       v
Store embeddings in FAISS
       |
       v
Embed submitted answer and retrieve relevant chunks
       |
       v
Optional reranking
       |
       v
Verification model compares answer with evidence
       |
       v
Optional LLM fallback for uncertain cases
       |
       v
Return one final label and supporting details
```

## 8. Functional Requirements

### FR-01: Input Form
The frontend shall provide fields for the question, source material, and answer.

### FR-02: Input Validation
The application shall reject empty or invalid required fields and display helpful validation messages.

### FR-03: Source Processing
The backend shall accept source text and split it into chunks suitable for semantic retrieval.

### FR-04: Semantic Retrieval
The system shall embed source chunks and retrieve relevant chunks for a submitted answer.

### FR-05: Answer Verification
The system shall compare the submitted answer with retrieved evidence and assign one overall label.

### FR-06: Result Display
The frontend shall display the final label, a concise explanation, and relevant evidence when available.

### FR-07: Error Handling
The application shall show useful error messages when input processing or API requests fail.

### FR-08: Clear Form
The user shall be able to clear the input fields and start a new verification.

## 9. Non-Functional Requirements

- Responsive design for desktop and mobile.
- Accessible labels and keyboard navigation.
- Typed frontend data structures.
- Validated backend request and response schemas.
- No secrets or API keys committed to source control.
- Clear separation between frontend, backend, retrieval, and verification modules.
- Honest handling of uncertainty and missing evidence.

## 10. Verification Logic

1. Process the source material and create chunks.
2. Generate embeddings for the chunks.
3. Retrieve the most relevant chunks for the submitted answer.
4. Compare the answer with the retrieved evidence.
5. Assign `SUPPORTED`, `CONTRADICTED`, or `NOT FOUND`.
6. If the evidence is insufficient or the model is uncertain, use the configured fallback or return `NOT FOUND`.

Semantic similarity is used to find relevant evidence. It must not be used alone to determine whether the answer agrees with the source.

A claim missing from the source must not automatically be classified as contradicted. A contradiction requires evidence that conflicts with the answer.

## 11. Initial Stage Scope

The initial stage shall implement:

- Project structure
- Frontend form and responsive UI
- FastAPI backend
- Request and response schemas
- Health-check endpoint
- Frontend-to-backend connection
- Input validation and error handling
- Results UI prepared for verification output

The initial stage shall **not** pretend that the RAG or verification pipeline is operational if those components have not yet been implemented.

## 12. API Endpoints

### `GET /health`

Returns the backend health status.

Example response:

```json
{
  "status": "ok"
}
```

### `POST /verify`

Accepts the question, source material, and answer.

Example request:

```json
{
  "question": "What does photosynthesis produce?",
  "source_material": "Photosynthesis uses sunlight, carbon dioxide, and water to produce glucose and oxygen.",
  "answer": "Photosynthesis produces glucose and oxygen."
}
```

During the initial stage, this endpoint may return a clearly identified placeholder response. It must not fabricate a verification label.

## 13. Suggested Project Structure

```text
educational-answer-grounding-checker/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── types/
│   ├── public/
│   └── package.json
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/
│   │   ├── schemas/
│   │   └── services/
│   ├── tests/
│   └── requirements.txt
├── .env.example
├── .gitignore
├── docker-compose.yml
└── README.md
```

## 14. Acceptance Criteria

The initial stage is complete when:

- The frontend runs locally.
- The backend runs locally.
- The frontend can reach the backend.
- Required fields are validated.
- The health endpoint responds successfully.
- The verify endpoint accepts valid input.
- Placeholder behavior is clearly identified.
- Errors are displayed gracefully.
- The README explains setup and run commands.

## 15. Future Enhancements

- Complete RAG pipeline with FAISS or Qdrant.
- PDF and DOCX uploads.
- Evidence highlighting and source references.
- Confidence thresholds and uncertain-case handling.
- LLM fallback for difficult comparisons.
- Saved documents and verification history.
- Evaluation dataset and automated tests.
- Docker-based production deployment.
