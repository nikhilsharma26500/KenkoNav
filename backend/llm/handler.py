import google.generativeai as genai
from PIL import Image
import os
from dotenv import load_dotenv, find_dotenv
import requests
from io import BytesIO
from food.db_functions import fetch_dietary_info
import json

load_dotenv(find_dotenv())

class GeminiHandler:

    def __init__(self, model_name: str = "gemini-1.5-flash"):
        self.model_name = model_name
        self.api_key = os.environ.get("GEMINI_API_KEY")
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY environment variable is not set")
        genai.configure(api_key=self.api_key)

    url = "https://images.unsplash.com/photo-1576484715664-eee57518029a?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

    def download_image(self, url):
        try:
            response = requests.get(url)
            response.raise_for_status()
            return Image.open(BytesIO(response.content))
        
        except requests.RequestException as e:
            raise ValueError(f"Failed to download image: {e}")
        
    def generate_response(self, query: str, image_url: str, additional_info: dict):
        try:
            user_info = json.dumps(additional_info)
            print(additional_info)

            prompt = f"""your job is just to be straight to the point and answer whatever the user has asked. If the user asks for the ingredients, you should list them out. If the user asks if any of the ingredients are harmful, you should provide that information as well. User is also providing you with additional info about their health background, take a look at them and give them an edvice based on it. You should also be able to handle multiple questions in a single response. For example, if the user asks for the ingredients and then asks if any of them are harmful, you should be able to answer both questions in a single response.

            You will also be provided with extra information about the user's health background. This information will include allergies, medical conditions, restrictions, and any additional information the user provides. You should take this information into account when generating your response.

            Additional Information: {user_info}

            Over in category: {user_info[0]}, the answer should be generated such that it meets the consumption pattern for that category such that, if it's "food" then it should be consumable, if it's "cosmetics" then it should be applicable to the skin, etc.
            """


            model = genai.GenerativeModel(model_name=self.model_name)
            response = model.generate_content([
                query,
                prompt,
                user_info,
                image_url
            ])

            return response.text
        
        except Exception as e:
            return f"Error generating response: {e}"
        