# Research Assistant for PDFs

![Research Assistant Demo](./screenshots/Screenshot1.png) *Replace with your actual demo image*

A full-stack application that helps researchers by automatically generating structured summaries from uploaded PDFs and providing a question-answering interface powered by multiple LLMs.

## Features

- **Multi-Model Support**: Choose between Gemini, Ollama, or a refined combination of both (using DeepSeek)
- **Structured Summaries**: Automatic generation of summaries with:
  - Title & Authors
  - Abstract
  - Problem Statement
  - Methodology
  - Key Results
  - Conclusion
- **Chat with Documents**: Question-answering interface with chat history
- **User Authentication**: Secure user accounts to save and access previous summaries
- **Advanced RAG Pipeline**: Utilizes FAISS for efficient document retrieval
- **Responsive UI**: Clean, user-friendly interface built with React

## Tech Stack

### Frontend

<p align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="Material UI" />
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="Redux" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" />
</p>

### Backend

<p align="left">
  <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" alt="FastAPI" />
  <img src="https://img.shields.io/badge/SQLAlchemy-1C1C1C?style=for-the-badge&logo=python&logoColor=white" alt="SQLAlchemy" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/NeonDB-00f000?style=for-the-badge&logo=neondatabase&logoColor=white" alt="NeonDB" />
  <img src="https://img.shields.io/badge/LangChain-00A67E?style=for-the-badge&logo=langchain&logoColor=white" alt="LangChain" />
  <img src="https://img.shields.io/badge/FAISS-FF6B00?style=for-the-badge&logo=facebook&logoColor=white" alt="FAISS" />
  <img src="https://img.shields.io/badge/Hugging%20Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black" alt="Hugging Face" />
</p>

### LLM Integration

<p align="left">
  <img src="https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google Gemini" />
  <img src="https://img.shields.io/badge/Ollama-7D7DFF?style=for-the-badge&logo=ollama&logoColor=white" alt="Ollama" />
  <img src="https://img.shields.io/badge/DeepSeek-00CCFF?style=for-the-badge&logo=deepseek&logoColor=black" alt="DeepSeek" />
  <br>
  <small>Models: Gemini-1.5-flash | Llama3.2:3b (Ollama) | deepseek-r1:1.5b (DeepSeek)</small>
</p>

## Getting Started

### Prerequisites

- Python 3.9+
- PostgreSQL
- Ollama (if using local models)
- Google API key (for Gemini)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/sudarshan-raveendranath/Research-Assistant-for-PDFs.git
   cd research-assistant
    ```
2. **Set up the backend**

   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   ```

   Create a `.env` file in the `backend` directory with your database URL and API keys:

   ```plaintext
   DATABASE_URL=postgresql://user:password@localhost/dbname
   GOOGLE_API_KEY=your_google_api_key
   ```
3. **Set up the frontend**

   ```bash
    cd ../frontend
    npm install
    ```
4. **Run the backend**

   ```bash
   cd backend
   uvicorn main:app --reload
   ```
5. **Run the frontend**

   ```bash
    cd frontend
    npm start
    ```
   The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:8000`.

## Usage
1. Register or Login to your account.
2. Upload a PDF document.
3. Choose your preferred LLM model for summarization. (Gemini, Ollama, or Gemini + Ollama)
3. The application will automatically generate a structured summary.
4. View the structured summary.
4. You can ask questions about the document in the chat interface.
5. View your saved summaries from the "My Summaries" section.

## Configuration
You can configure the application by modifying the `.env` file in the `backend` directory. Here are the available options:

```plaintext
DATABASE_URL=postgresql://user:password@localhost/dbname
GOOGLE_API_KEY=your_google_api_key
JWT_SECRET_KEY=your_jwt_secret_key
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Project Structure

```
research-assistant/
├── backend/                  # FastAPI backend
│   ├── app/                  # Application code
│   │   ├── database/         # DB models and connection
│   │   ├── auth/             # Authentication logic
│   │   ├── config/           # Configuration settings
│   │   ├── llms/             # LLM integration
│   │   ├── models/           # Pydantic models
│   │   ├── routes/           # API endpoints
│   │   ├── schemas/          # Data schemas
│   │   ├── services/         # Business logic
│   │   ├── utils/            # Helper functions
│   │   └── main.py           # FastAPI app
│   └── requirements.txt      # Python dependencies
│   └── .env                  # Environment variables
│   └── faiss_indexes/        # FAISS index files
│
├── frontend/                 # React frontend
│   ├── public/               # Static files
│   ├── src/                  # Application code
│   │   ├── api/              # API service calls
│   │   ├── app/              # Redux store and context
│   │   ├── auth/             # Authentication components
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   └── App.js            # Main app component
│   └── package.json          # Node dependencies
└── README.md                 # This file
```

## Screenshots
![Screenshot 1](./screenshots/Screenshot2.png) *Replace with your actual screenshot*
![Screenshot 2](./screenshots/Screenshot3.png) *Replace with your actual screenshot*
![Screenshot 3](./screenshots/Screenshot5.png) *Replace with your actual screenshot*

## Future Improvements

- **Multi-Language Support**: Add support for multiple languages in summarization and chat.
- **Enhanced Search**: Implements full-text search capabilities across summaries.
- **User Analytics**: Track user interactions to improve the application.
- **Mobile App**: Develop a mobile version of the application for on-the-go access.
- **Collaboration Features**: Allow users to share summaries and collaborate on documents.
- **Custom Model Support**: Allow users to upload and use their own models for summarization.
- **Batch Processing**: Enable batch processing of multiple PDFs for summarization.
   
   
