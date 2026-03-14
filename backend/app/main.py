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

is_dev = os.getenv("ENVIRONMENT", "development") == "development"
allowed_origins = ["*"] if is_dev else os.getenv("ALLOWED_ORIGINS", "").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=not is_dev,  # credentials incompatible with wildcard origin
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(visa_router)


@app.get("/health")
def health():
    return {"status": "success", "data": {"healthy": True}}
