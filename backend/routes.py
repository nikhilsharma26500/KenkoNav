from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv, find_dotenv
import os

from food.db_functions import create_user
from food.controller import conversation as food_conversation
from cosmetics.controller import conversation as cosmetics_conversation

load_dotenv(find_dotenv())

app = FastAPI()

origins = ["http://localhost:5173","http://127.0.0.1:8000", "http://192.168.2.34:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/create_user_account")
def create_user_account(first_name: str, last_name: str, email: str):
    
    user_id = create_user(first_name, last_name, email)
    
    if isinstance(user_id, str):
        raise HTTPException(status_code=400, detail=user_id)
    
    return {"user_id": user_id}

app.include_router(food_conversation.router)
app.include_router(cosmetics_conversation.router)