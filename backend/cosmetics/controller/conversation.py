from fastapi import APIRouter, HTTPException, UploadFile, File, Form
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
async def set_model_response_cosmetics(
    category: str = Form("food"),
    allergies: str = Form(""),
    medicalConditions: str = Form(""),
    restrictions: str = Form(""),
    additionalInfo: str = Form(""),
    file: UploadFile = File(...)
    ):

    file_location = os.path.join(UPLOAD_DIR, file.filename)
    
    with(open(file_location, "wb+")) as f:
        f.write(await file.read())

    img_address = Image.open(file_location)

    additional_info = {
        "Allergies": allergies,
        "Medication Condition": medicalConditions,
        "Restrictions": restrictions,
        "Additional Info": additionalInfo
    }

    response = llm_handler.generate_response(
        category=category, 
        query="What are the ingredients in this product? Will it affect health?", 
        image_url=img_address,
        additional_info=additional_info
    )

    print(response)
    
    return {"message": response}