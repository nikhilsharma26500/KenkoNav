from food.db_functions import (
    create_user,
    add_dietary_info,
    fetch_dietary_info,
    add_model_response_food,
)
from database import table_creation_session

def test_create_user():
    session = table_creation_session()

    first_name = "John"
    last_name = "Doe"
    email = "test@user.com"

    user_id = create_user(first_name=first_name, last_name=last_name, email=email)
    session.close()

    print(user_id)

# test_create_user()

def test_add_dietary_info():
    session = table_creation_session()

    user_id = "4f8daf90-3c8e-4ad2-b55b-ebf1f7b46ba6"
    allergies = "peanuts"
    medical_conditions = "diabetes type 2"
    dietary_restrictions = "no pork or pig products"
    additional_info = "lactose intolerant"

    add_dietary_info(
        user_id=user_id,
        allergies=allergies,
        medical_conditions=medical_conditions,
        dietary_restrictions=dietary_restrictions,
        additional_info=additional_info,
    )
    session.close()

# test_add_dietary_info()

def test_fetch_dietary_info():
    session = table_creation_session()

    user_id = "4f8daf90-3c8e-4ad2-b55b-ebf1f7b46ba6"

    dietary_info = fetch_dietary_info(user_id=user_id)
    session.close()

    print(dietary_info)

# test_fetch_dietary_info()