from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from app.auth.jwt import get_current_user
from app.schemas.pdf_schemas import PDFUploadRequest
from app.utils.pdf_loader import load_pdf_pages
from app.utils.text_splitter import split_text
from app.utils.embedding_generator import get_embeddings_model
from app.utils.vector_store import create_faiss_index
from app.services.summerizer_service import generate_rag_summary
import aiofiles
import tempfile
import os

router = APIRouter(prefix="/pdf", tags=["PDF Upload and Summarization"])

@router.post("/upload")
async def upload_pdf(
    model_data: PDFUploadRequest,
    file: UploadFile = File(...),
    current_user: str = Depends(get_current_user)
):
    try:
        temp_dir = tempfile.mkdtemp()
        file_path = os.path.join(temp_dir, file.filename)

        async with aiofiles.open(file_path, 'wb') as out_file:
            content = await file.read()
            await out_file.write(content)

        pages = await load_pdf_pages(file_path)
        pdf_text = "\n".join([page.page_content for page in pages])
        title = os.path.splitext(file.filename)[0]
        
        chunks = split_text(pdf_text)
        embeddings_model = get_embeddings_model()
        documents = [{"page_content": chunk} for chunk in chunks]
        create_faiss_index(documents, embeddings_model, index_path=f"faiss_indexes/{title}")

        summary = await generate_rag_summary(model_data.model, title, current_user)

        return {
            "summary": summary,
            "type": "multiple" if isinstance(summary, list) else "single"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
