from fastapi import APIRouter, Depends, HTTPException, status
from app.auth.jwt import get_current_user
from app.services.pdf_service import get_user_pdfs
from app.models.pdf_models import UploadedPDF
from typing import List

router = APIRouter(prefix="/summaries", tags=["Summaries"])

@router.get("/pdfs", response_model=List[dict])
def fetch_user_summaries(current_user: str = Depends(get_current_user)):
    pdfs = get_user_pdfs(current_user.username)
    return [
        {
            "id": pdf.id,
            "filename": pdf.filename,
            "summary": pdf.summary,
            "model_used": pdf.model_used,
            "uploaded_at": pdf.uploaded_at,
        }
        for pdf in pdfs
    ]
