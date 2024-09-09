from fastapi import APIRouter, HTTPException
from db_functions import *
from database import table_creation_session
from llm.handler import GeminiHandler

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


@router.post("/set_model_response")
def set_model_response(user_id: str, category: str, image_url: str, response: str):
    # Have to call LLM here

    add_model_response_cosmetics(user_id, category, image_url, response)
    
    return {"message": "Model response added successfully!"}