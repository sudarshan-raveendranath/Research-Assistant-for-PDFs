from fastapi import APIRouter, HTTPException, Depends
from app.schemas.chat_request import ChatRequest
from app.services.chatbot import query_llm
from app.auth.jwt import get_current_user

router = APIRouter(prefix="/api", tags=["Chat Bot"])

@router.post("/chat")
def chat_endpoint(request: ChatRequest, current_user: str = Depends(get_current_user)):
    try:
        answer = query_llm(
            question=request.question,
            chat_history_raw=request.chat_history,
            current_user=current_user.username
        )
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

