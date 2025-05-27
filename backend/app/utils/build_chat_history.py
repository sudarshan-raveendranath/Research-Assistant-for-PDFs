from langchain_core.messages import HumanMessage, AIMessage

def build_chat_history(chat_history_list):
    history = []
    for user_msg, ai_msg in chat_history_list:
        history.append(HumanMessage(content=user_msg))
        history.append(AIMessage(content=ai_msg))
    return history
