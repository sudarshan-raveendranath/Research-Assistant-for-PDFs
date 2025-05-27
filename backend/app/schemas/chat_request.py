from pydantic import BaseModel
from typing import List, Tuple

class ChatRequest(BaseModel):
    question: str
    chat_history: List[Tuple[str, str]]  # List of (user, assistant) messages
