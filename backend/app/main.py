from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.auth import users
from app.database.database import engine, Base
from app.routes import upload_routes

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/auth")
app.include_router(upload_routes.router, tags=["PDF Upload and Summarization"])

