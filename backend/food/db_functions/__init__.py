from database import table_creation_session, UserProfile, Food, ModelResponse
from datetime import datetime
from typing import List
import uuid

"""
Functions that we need:
- create_user
- add_dietary_info
- fetch_dietary_info
- add_model_response
"""

def create_user(first_name: str, last_name: str, email: str):
    session = table_creation_session()

    new_user = UserProfile(
        user_id=uuid.uuid4(),
        first_name=first_name,
        last_name=last_name,
        email=email,
        created_at=datetime.now(),
    )

    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    session.close()

    new_user_dict = new_user.__dict__
    new_user_dict.pop("_sa_instance_state")

    return new_user_dict


# def add_dietary_info(user_id: str, allergies: str, medical_conditions: str, dietary_restrictions: str, additional_info: str):
def add_dietary_info(user_id: str, allergies: List[str], medical_conditions: List[str], dietary_restrictions: List[str], additional_info: List[str]):
    
    try:
        session = table_creation_session()

        new_dietary_info = Food(
            user_id=user_id,
            allergies=allergies,
            medical_conditions=medical_conditions,
            dietary_restrictions=dietary_restrictions,
            additional_info=additional_info,
        )

        session.add(new_dietary_info)
        session.commit()
        session.refresh(new_dietary_info)

    except Exception as e:
        session.rollback()
        return ValueError(f"Error: {e}")

    finally:
        session.close()


def fetch_dietary_info(user_id: str):

    session = table_creation_session()

    user_dietary_info = session.query(Food).filter(Food.user_id == user_id).first()

    session.close()

    if user_dietary_info:
        return {
            "allergies": user_dietary_info.allergies,
            "medical_conditions": user_dietary_info.medical_conditions,
            "dietary_restrictions": user_dietary_info.dietary_restrictions,
            "additional_info": user_dietary_info.additional_info,
        }
    
    else:
        return None


def add_model_response_food(user_id: str, category: str, image_url: str, response: str):

    try:
        session = table_creation_session()

        new_model_response = ModelResponse(
            user_id=user_id,
            category="food",
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