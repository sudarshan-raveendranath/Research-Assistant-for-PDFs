from sqlalchemy import Column, Integer, String, Text, DateTime
from app.database.database import Base
from sqlalchemy.sql import func

class UploadedPDF(Base):
    __tablename__ = "uploaded_pdfs"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    summary = Column(Text, nullable=False)
    model_used = Column(String, nullable=False)
    owner = Column(String, nullable=False)
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
    
