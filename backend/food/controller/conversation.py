from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from food.db_functions import *
from database import table_creation_session
from llm.handler import GeminiHandler
import os
from PIL import Image
import json


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


UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

model_response = {}

@router.post("/set_model_response_food")
async def set_model_response_food(
    category: str = Form("food"),
    allergies: str = Form(""),
    medicalConditions: str = Form(""),
    dietaryRestrictions: str = Form(""),
    additionalInfo: str = Form(""),
    file: UploadFile = File(...)
    ):

    file_location = os.path.join(UPLOAD_DIR, file.filename)
    
    with(open(file_location, "wb+")) as f:
        f.write(await file.read())

    img_address = Image.open(file_location)

    additional_info = {
        "Category": category,
        "Allergies": allergies,
        "Medication Condition": medicalConditions,
        "Dietary Restrictions": dietaryRestrictions,
        "Additional Info": additionalInfo
    }

    response = llm_handler.generate_response(
        query="What are the ingredients in this product? Will it affect health?", 
        image_url=img_address,
        additional_info=additional_info
    )
    
    return {"message": response}

@router.get("/get_model_response")
def get_model_response(user_id: str):
    
    model_response = fetch_model_response(user_id)
    
    if isinstance(model_response, str):
        raise HTTPException(status_code=400, detail=model_response)
    
    return model_response