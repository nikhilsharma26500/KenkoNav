from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv, find_dotenv
import os

from food.controller import conversation as food_conversation
from cosmetics.controller import conversation as cosmetics_conversation

load_dotenv(find_dotenv())

app = FastAPI()

origins = ["http://localhost:3000","http://127.0.0.1:8000",]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(food_conversation.router)
app.include_router(cosmetics_conversation.router)