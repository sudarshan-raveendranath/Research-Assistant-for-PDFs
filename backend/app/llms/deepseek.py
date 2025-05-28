# ollama.py
from langchain_community.chat_models import ChatOllama

def get_deepseek_llm():
    return ChatOllama(model="deepseek-r1:1.5b")