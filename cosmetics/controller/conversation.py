from fastapi import APIRouter, HTTPException
from db_functions import *
from database import table_creation_session

router = APIRouter(prefix="/cosmetics", tags=["Cosmetics"])

