from langchain_community.document_loaders import PyMuPDFLoader
from typing import List
from langchain_core.documents import Document

async def load_pdf_pages(file_path: str) -> List[Document]:
    """
    Loads and splits a PDF file into pages using PyMuPDFLoader (langchain).
    Returns a list of Langchain Document objects.
    """
    loader = PyMuPDFLoader(file_path)
    pages = loader.load_and_split()
    return pages