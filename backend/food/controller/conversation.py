from fastapi import APIRouter, HTTPException
from food.db_functions import *
from database import table_creation_session
from llm.handler import GeminiHandler

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

    

    add_model_response_food(user_id, response)
    
    return {"message": "Model response added successfully!"}