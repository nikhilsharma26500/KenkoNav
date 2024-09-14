from fastapi import APIRouter, HTTPException, UploadFile, File
from food.db_functions import *
from database import table_creation_session
from llm.handler import GeminiHandler
import os
from PIL import Image


llm_handler = GeminiHandler()

router = APIRouter(prefix="/food", tags=["Food"])


@router.post("/set_dietary_info")
def set_dietary_info(user_id: str, allergies: str, medical_conditions: str, dietary_restrictions: str, additional_info: str):
    
    add_dietary_info(user_id, allergies, medical_conditions, dietary_restrictions, additional_info)
    
    return {"message": "Dietary information added successfully!"}


@router.get("/get_dietary_info")
def get_dietary_info(user_id: str):
    
    dietary_info = fetch_dietary_info(user_id)
    
    if isinstance(dietary_info, str):
        raise HTTPException(status_code=400, detail=dietary_info)
    
    return dietary_info

@router.post("/set_model_response")
def set_model_response(user_id: str, response: str):
    # Have to call LLM here

    

    
    return {"message": "Model response added successfully!"}


UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/set_model_response")
async def set_model_response(category = "food", file: UploadFile = File(...)):

    file_location = os.path.join(UPLOAD_DIR, file.filename)
    
    with(open(file_location, "wb+")) as f:
        f.write(await file.read())

    img_address = Image.open(file_location)

    response = llm_handler.generate_response(category=category, query="What are the ingredients of this product?", image_url=img_address)

    print(response)
    
    return {"message": response}

@router.get("/get_model_response")
def get_model_response(user_id: str):
    
    model_response = fetch_model_response(user_id)
    
    if isinstance(model_response, str):
        raise HTTPException(status_code=400, detail=model_response)
    
    return model_response