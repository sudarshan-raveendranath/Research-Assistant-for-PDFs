from app.database.database import SessionLocal
from app.models.pdf_models import UploadedPDF

def save_pdf_summary(title: str, summary: str, model: str, owner: str):
    db = SessionLocal()
    try:
        pdf = UploadedPDF(
            filename=title,
            summary=summary,
            model_used=model,
            owner=owner
        )
        db.add(pdf)
        db.commit()
    finally:
        db.close()