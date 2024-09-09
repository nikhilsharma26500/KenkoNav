from database import table_creation_session, UserProfile, Cosmetics, ModelResponse
from datetime import datetime
from typing import List


"""
Functions that we need:
- add_health_info
- fetch_health_info
- add_model_response
"""

def add_health_info(user_id: str, allergies: str, medical_conditions: str, restrictions: str, additional_info: str):
# def add_health_info(user_id: str, allergies: List[str], medical_conditions: List[str], restrictions: List[str], additional_info: List[str]):
    
    try:
        session = table_creation_session()

        new_health_info = Cosmetics(
            user_id=user_id,
            allergies=allergies,
            medical_conditions=medical_conditions,
            restrictions=restrictions,
            additional_info=additional_info,
        )

        session.add(new_health_info)
        session.commit()
        session.refresh(new_health_info)

    except Exception as e:
        session.rollback()
        return ValueError(f"Error: {e}")

    finally:
        session.close()


def fetch_health_info(user_id: str):
    try:
        session = table_creation_session()

        health_info = session.query(Cosmetics).filter(Cosmetics.user_id == user_id).first()

        if health_info:
            return {
                "allergies": health_info.allergies,
                "medical_conditions": health_info.medical_conditions,
                "restrictions": health_info.restrictions,
                "additional_info": health_info.additional_info,
            }

        return None

    except Exception as e:
        return ValueError(f"Error: {e}")

    finally:
        session.close()


def add_model_response_cosmetics(user_id: str, category: str, image_url: str, response: str):
    try:
        session = table_creation_session()

        new_model_response = ModelResponse(
            user_id=user_id,
            category=category,
            image_url=image_url,
            response=response,
        )

        session.add(new_model_response)
        session.commit()
        session.refresh(new_model_response)

    except Exception as e:
        session.rollback()
        return ValueError(f"Error: {e}")

    finally:
        session.close()