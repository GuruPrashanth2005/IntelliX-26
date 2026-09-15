from pydantic import BaseModel, Field
from typing import List, Optional

class QuestionBase(BaseModel):
    question_text: str = Field(..., min_length=5)

class QuestionCreate(QuestionBase):
    pass

class Question(QuestionBase):
    id: int
    material_id: int

    class Config:
        from_attributes = True

class MaterialBase(BaseModel):
    title: str = Field(..., min_length=1)
    content: str = Field(..., min_length=20)

class MaterialCreate(MaterialBase):
    pass

class Material(MaterialBase):
    id: int
    questions: List[Question] = []

    class Config:
        from_attributes = True

class VerificationRequest(BaseModel):
    question_id: int
    answer: str = Field(..., min_length=1)

class VerificationResponse(BaseModel):
    status: str
    message: str
    overall_label: str
    explanation: str
