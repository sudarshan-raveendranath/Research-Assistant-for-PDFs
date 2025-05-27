from app.utils.embedding_generator import get_embeddings_model
from app.utils.vector_store import load_faiss_index
from app.utils.prompt_templates import get_summary_prompt
from app.utils.rag_chain_builder import create_rag_chain
from app.llms.gemini import get_gemini_llm
from app.llms.ollama import get_ollama_llm
from app.services.pdf_service import save_pdf_summary

async def generate_rag_summary(model_choice: str, title: str, owner: str):
    embeddings = get_embeddings_model()
    vector_store = load_faiss_index(f"faiss_indexes/{title}", embeddings)
    prompt = get_summary_prompt()

    rag_chain_gemini = create_rag_chain(get_gemini_llm(), vector_store, prompt)
    rag_chain_ollama = create_rag_chain(get_ollama_llm(), vector_store, prompt)

    if model_choice == "gemini":
        summary = rag_chain_gemini.invoke({"input": "Generate a summary of the document."})["output"]
        save_pdf_summary(title, summary, "gemini", owner)
        return summary

    elif model_choice == "ollama":
        summary = rag_chain_ollama.invoke({"input": "Generate a summary of the document."})["output"]
        save_pdf_summary(title, summary, "ollama", owner)
        return summary

    elif model_choice == "gemini_ollama":
        g_summary = rag_chain_gemini.invoke({"input": "Generate a summary of the document."})["output"]
        o_summary = rag_chain_ollama.invoke({"input": "Generate a summary of the document."})["output"]

        refinement_prompt = (
            "Refine the following two summaries into a more accurate and coherent final summary:\n\n"
            f"Summary from Gemini:\n{g_summary}\n\n"
            f"Summary from Ollama:\n{o_summary}\n\n"
            "Please generate an improved summary:"
        )
        refined_summary = get_gemini_llm().invoke(refinement_prompt)["output"]
        save_pdf_summary(title, refined_summary, "gemini_ollama", owner)

        return (
            f"Refined Final Summary by Gemini:\n{refined_summary}"
        )

    elif model_choice == "gemini_vs_ollama":
        g_summary = rag_chain_gemini.invoke({"input": "Generate a summary of the document."})["output"]
        o_summary = rag_chain_ollama.invoke({"input": "Generate a summary of the document."})["output"]
        combined_list = [g_summary, o_summary]
        combined = (
            f"Gemini Summary:\n{g_summary}\n\n"
            f"Ollama Summary:\n{o_summary}\n\n"
            f"Comparison:\nGemini: {g_summary}\n\nVS\n\nOllama: {o_summary}"
        )
        save_pdf_summary(title, combined, "gemini_vs_ollama", owner)
        return combined_list

    else:
        raise ValueError(f"Invalid model choice: {model_choice}")
