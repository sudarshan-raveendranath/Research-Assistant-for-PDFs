import logging
from typing import List
from langchain.text_splitter import RecursiveCharacterTextSplitter

logger = logging.getLogger(__name__)

def split_text(
    text: str, 
    chunk_size: int = 500, 
    chunk_overlap: int = 100, 
    separators: List[str] = None
) -> List[str]:
    """
    Splits a given text into smaller chunks using RecursiveCharacterTextSplitter.

    Args:
        text: The full text string to split.
        chunk_size: The maximum size of each text chunk.
        chunk_overlap: The number of overlapping characters between chunks.
        separators: A list of separators to prioritize splitting on.

    Returns:
        A list of text chunks.
    """
    try:
        if not text.strip():
            logger.warning("Empty or whitespace-only text received for splitting.")
            return []

        separators = separators or ["\n\n", "\n", ".", " "]

        splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separators=separators
        )

        chunks = splitter.split_text(text)
        return chunks

    except Exception as e:
        logger.error("Text splitting failed: %s", str(e), exc_info=True)
        raise RuntimeError("Error while splitting text") from e
