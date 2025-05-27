import os
import logging
from pathlib import Path
from typing import List, Union
from langchain_community.vectorstores import FAISS
from langchain.schema import Document

logger = logging.getLogger(__name__)

def create_faiss_index(
    documents: List[Document], 
    embeddings_model, 
    index_path: Union[str, Path] = "faiss_index"
) -> None:
    """
    Create a FAISS index from documents and save it locally.

    Args:
        documents: List of LangChain Document objects to index.
        embeddings_model: Embeddings model used to convert documents.
        index_path: Path to save the FAISS index files.
    """
    try:
        index_path = Path(index_path)
        index_file = index_path / "index.faiss"
        pkl_file = index_path / "index.pkl"

        if index_file.exists() and pkl_file.exists():
            logger.info("FAISS index already exists. Skipping creation.")
            return

        logger.info("Creating new FAISS index...")
        vector_db = FAISS.from_documents(documents, embeddings_model)

        index_path.mkdir(parents=True, exist_ok=True)
        vector_db.save_local(str(index_path))
        logger.info("FAISS index successfully saved at '%s'", index_path)

    except Exception as e:
        logger.error("Failed to create FAISS index: %s", str(e), exc_info=True)
        raise RuntimeError("Error while creating FAISS index") from e


def load_faiss_index(
    index_path: Union[str, Path], 
    embeddings_model
) -> FAISS:
    """
    Load an existing FAISS index from the specified path.

    Args:
        index_path: Directory path where the FAISS index files are stored.
        embeddings_model: Embeddings model used to initialize the FAISS vector store.

    Returns:
        FAISS: Loaded FAISS vector store instance.
    """
    try:
        index_path = Path(index_path)
        if not (index_path / "index.faiss").exists() or not (index_path / "index.pkl").exists():
            raise FileNotFoundError(f"No FAISS index found at '{index_path}'")

        vector_store = FAISS.load_local(
            str(index_path),
            embeddings_model,
            allow_dangerous_deserialization=True
        )
        logger.info("FAISS index successfully loaded from '%s'", index_path)
        return vector_store

    except Exception as e:
        logger.error("Failed to load FAISS index: %s", str(e), exc_info=True)
        raise RuntimeError("Error while loading FAISS index") from e
