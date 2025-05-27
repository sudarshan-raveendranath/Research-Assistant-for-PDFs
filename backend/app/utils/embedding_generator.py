import logging
from langchain_huggingface import HuggingFaceEmbeddings

logger = logging.getLogger(__name__)

def get_embeddings_model():
    try:
        model_name = "sentence-transformers/all-MiniLM-L6-v2"
        logger.info(f"Loading HuggingFaceEmbeddings model: {model_name}")
        model = HuggingFaceEmbeddings(model_name=model_name)
        return model
    except Exception as e:
        logger.exception("Error loading HuggingFaceEmbeddings model: %s", e)
        raise
