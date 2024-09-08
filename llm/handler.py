import google.generativeai as genai
from PIL import Image
import os
import requests
from io import BytesIO


def download_image(url):
    response = requests.get(url)
    response.raise_for_status()
    return Image.open(BytesIO(response.content))

url = "https://images.unsplash.com/photo-1576484715664-eee57518029a?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

genai.configure(api_key=os.environ["GEMINI_API_KEY"])
# path_to_image = r"C:\Users\nikhi\OneDrive\Documents\Projects\Open Source\side_project\public\test_image.jpg"
# img = PIL.Image.open(path_to_image)
img = download_image(url)

prompt = "your job is just to be straight to the point and answer whatever the user has asked. If the user asks for the ingredients, you should list them out. If the user asks if any of the ingredients are harmful, you should provide that information as well. You should also be able to handle multiple questions in a single response. For example, if the user asks for the ingredients and then asks if any of them are harmful, you should be able to answer both questions in a single response."

model = genai.GenerativeModel(model_name="gemini-1.5-flash")
response = model.generate_content(["What are the ingredients?", prompt, img])
print(response.text)