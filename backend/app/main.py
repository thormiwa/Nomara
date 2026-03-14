from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

from app.routes.visa_check import router as visa_router

load_dotenv()

app = FastAPI(
    title="Nomara API",
    description="Visa-first travel planning for African travelers.",
    version="0.1.0",
)

allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(visa_router)


@app.get("/health")
def health():
    return {"status": "success", "data": {"healthy": True}}
