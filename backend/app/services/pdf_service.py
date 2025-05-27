from app.database.database import SessionLocal
from app.models.pdf_models import UploadedPDF
import json

def save_pdf_summary(title: str, summary: str, model: str, owner: str):
    db = SessionLocal()
    try:
        summary_text = json.dumps(summary)
        pdf = UploadedPDF(
            filename=title,
            summary=summary_text,
            model_used=model,
            owner=owner.username
        )
        db.add(pdf)
        db.commit()
    finally:
        db.close()