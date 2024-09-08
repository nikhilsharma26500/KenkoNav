import google.generativeai as genai
import PIL.Image
import os

path_to_image = r"C:\Users\nikhi\OneDrive\Documents\Projects\Open Source\side_project\public\test_image.jpg"

genai.configure(api_key=os.environ["GEMINI_API_KEY"])
img = PIL.Image.open(path_to_image)

prompt = "your job is just to be straight to the point and answer whatever the user has asked. If the user asks for the ingredients, you should list them out. If the user asks if any of the ingredients are harmful, you should provide that information as well. You should also be able to handle multiple questions in a single response. For example, if the user asks for the ingredients and then asks if any of them are harmful, you should be able to answer both questions in a single response."

model = genai.GenerativeModel(model_name="gemini-1.5-flash")
response = model.generate_content(["What are the ingredients?", prompt, img])
print(response.text)