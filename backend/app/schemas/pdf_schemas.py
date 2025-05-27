from pydantic import BaseModel

class PDFUploadRequest(BaseModel):
    model: str