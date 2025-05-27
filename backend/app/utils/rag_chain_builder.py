from langchain.chains import RetrievalQA
from langchain.prompts import ChatPromptTemplate

def create_rag_chain(llm, vector_store, prompt: ChatPromptTemplate):
    retriever = vector_store.as_retriever(search_kwargs={"k": 5})
    return RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        chain_type_kwargs={"prompt": prompt},
        return_source_documents=False
    )
