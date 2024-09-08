import google.generativeai as genai
from PIL import Image
import os
from dotenv import load_dotenv, find_dotenv
import requests
from io import BytesIO

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

    
        
    def generate_response(self, query: str, image_url: str):
        prompt = "your job is just to be straight to the point and answer whatever the user has asked. If the user asks for the ingredients, you should list them out. If the user asks if any of the ingredients are harmful, you should provide that information as well. You should also be able to handle multiple questions in a single response. For example, if the user asks for the ingredients and then asks if any of them are harmful, you should be able to answer both questions in a single response."

        try:
            img = self.download_image(image_url)
            model = genai.GenerativeModel(model_name=self.model_name)
            response = model.generate_content([query, prompt, img])
            return response.text
        except Exception as e:
            return f"Error generating response: {e}"