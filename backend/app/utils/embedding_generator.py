import logging
from langchain_huggingface import HuggingFaceEmbeddings
from typing import Optional

logger = logging.getLogger(__name__)

# Optional: cache the instance to avoid reloading
_cached_embedding_model = None

def get_embeddings_model(model_name: Optional[str] = None) -> HuggingFaceEmbeddings:
    """
    Loads and returns a HuggingFace embeddings model.
    
    Args:
        model_name (str): Optional custom model name. Defaults to MiniLM if not provided.
    
    Returns:
        HuggingFaceEmbeddings: The embedding model instance.
    
    Raises:
        RuntimeError: If model loading fails.
    """
    global _cached_embedding_model

    if _cached_embedding_model:
        return _cached_embedding_model

    try:
        model_to_use = model_name or "sentence-transformers/all-MiniLM-L6-v2"
        logger.info(f"Loading HuggingFace embeddings model: {model_to_use}")

        embeddings = HuggingFaceEmbeddings(model_name=model_to_use)
        _cached_embedding_model = embeddings
        return embeddings

    except Exception as e:
        logger.error("Failed to load HuggingFace embedding model: %s", str(e), exc_info=True)
        raise RuntimeError("Could not initialize the HuggingFace embeddings model") from e
