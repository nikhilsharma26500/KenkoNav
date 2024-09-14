from fastapi import APIRouter, HTTPException, UploadFile, File
from cosmetics.db_functions import *
from database import table_creation_session
from llm.handler import GeminiHandler
import os
from PIL import Image


llm_handler = GeminiHandler()

router = APIRouter(prefix="/cosmetics", tags=["Cosmetics"])

@router.post("/set_health_info")
def set_health_info(user_id: str, allergies: str, medical_conditions: str, restrictions: str, additional_info: str):
    
    add_health_info(user_id, allergies, medical_conditions, restrictions, additional_info)
    
    return {"message": "Health information added successfully!"}


@router.get("/get_health_info")
def get_health_info(user_id: str):
    
    health_info = fetch_health_info(user_id)
    
    if isinstance(health_info, str):
        raise HTTPException(status_code=400, detail=health_info)
    
    return health_info

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/set_model_response_cosmetics")
async def set_model_response_cosmetics(category = "cosmetics", file: UploadFile = File(...)):

    file_location = os.path.join(UPLOAD_DIR, file.filename)
    
    with(open(file_location, "wb+")) as f:
        f.write(await file.read())

    img_address = Image.open(file_location)

    response = llm_handler.generate_response(category=category, query="What are the ingredients of this product?", image_url=img_address)

    print(response)
    
    return {"message": response}