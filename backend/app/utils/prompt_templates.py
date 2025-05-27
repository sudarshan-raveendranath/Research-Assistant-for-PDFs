import logging
from langchain.prompts import ChatPromptTemplate, PromptTemplate
from langchain.schema.prompt_template import BasePromptTemplate

logger = logging.getLogger(__name__)

def get_summary_prompt() -> BasePromptTemplate:
    """
    Returns a structured prompt for summarizing academic/research documents,
    including Title, Abstract, Problem Statement, Methodology, Results, and Conclusion.
    """
    try:
        system_prompt = (
            "You are a research assistant. Based on the provided context from a research paper, "
            "generate a structured academic summary. Format your response under the following headers:\n\n"
            "**Title & Authors:**\n"
            "Extract or infer the title and authors if available.\n\n"
            "**Abstract:**\n"
            "Provide a brief overview of the paper.\n\n"
            "**Problem Statement:**\n"
            "Clearly explain the main research problem or question being addressed.\n\n"
            "**Methodology:**\n"
            "Describe the techniques, methods, or approaches used in the research.\n\n"
            "**Key Results:**\n"
            "Summarize the most important findings and outcomes.\n\n"
            "**Conclusion:**\n"
            "Describe the final conclusion, implications, and possible future work.\n\n"
            "Use academic language. Be objective, concise, and do not add information that is not present in the document.\n\n"
            "Context:\n{context}"
        )

        return ChatPromptTemplate.from_template(system_prompt)

    except Exception as e:
        logger.error("Failed to create research summary prompt: %s", str(e), exc_info=True)
        raise RuntimeError("Error creating structured summary prompt") from e
