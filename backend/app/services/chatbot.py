import os
from dotenv import load_dotenv
import logging
from app.utils.embedding_generator import get_embeddings_model
from langchain.chains import create_retrieval_chain, create_history_aware_retriever
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from app.utils.build_chat_history import build_chat_history
from app.state.user_state import user_latest_titles
from app.utils.vector_store import load_faiss_index
from app.llms.gemini import get_gemini_llm

load_dotenv()

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)
formatter = logging.Formatter('[%(asctime)s] %(levelname)s - %(message)s')
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)

def get_conversational_chain(current_user: str):
    logger.debug(f"Starting get_conversational_chain for user: {current_user}")
    
    title = user_latest_titles.get(current_user)
    logger.debug(f"Retrieved latest title for user: {title}")
    
    if not title:
        logger.error("No uploaded PDF found for the current user.")
        raise ValueError("No uploaded PDF found for the current user.")
    
    index_path = f"faiss_indexes/{title}"
    logger.debug(f"Loading FAISS index from path: {index_path}")
    
    embeddings = get_embeddings_model()
    logger.debug(f"Embeddings model loaded: {embeddings}")
    
    vectorstore = load_faiss_index(index_path, embeddings)
    logger.debug(f"Vectorstore loaded: {vectorstore}")
    llm = get_gemini_llm()
    logger.debug(f"LLM instance obtained: {llm}")

    condense_question_prompt = ChatPromptTemplate.from_messages([
        ("system", "Given a chat history and the latest user question "
                   "which might reference context in the chat history, "
                   "formulate a standalone question which can be understood without the chat history."),
        ("human", "{chat_history}"),
        ("human", "{input}")
    ])
    logger.debug(f"Condense question prompt created")

    history_aware_retriever = create_history_aware_retriever(
        llm, vectorstore.as_retriever(), condense_question_prompt
    )
    logger.debug(f"History aware retriever created")

    qa_prompt = ChatPromptTemplate.from_messages([
        ("system", 
        "You are an intelligent assistant specialized in answering questions based on academic research papers. "
        "Use the provided context to answer the user's question clearly and accurately. "
        "If the context does not contain the answer or you're unsure, respond with 'The information is not available in the document.'\n\n"
        "{context}"),
        ("placeholder", "{chat_history}"),
        ("human", "{input}")
    ])
    logger.debug("QA prompt created")


    qa_chain = create_stuff_documents_chain(llm, qa_prompt)
    logger.debug("QA chain created")
    conversation_chain = create_retrieval_chain(history_aware_retriever, qa_chain)
    logger.debug("Conversation chain created successfully")

    return conversation_chain

def query_llm(question: str, chat_history_raw: list, current_user: str):
    logger.debug(f"Querying LLM for user '{current_user}' with question: {question}")
    try:
        chain = get_conversational_chain(current_user)
        logger.debug("Conversational chain obtained successfully")

        history = build_chat_history(chat_history_raw)
        logger.debug(f"Built chat history: {history}")

        result = chain.invoke({
            "input": question,
            "chat_history": history,
        })
        logger.debug(f"LLM response: {result}")

        return result["answer"]

    except Exception as e:
        logger.error(f"Error in query_llm: {e}", exc_info=True)
        raise
