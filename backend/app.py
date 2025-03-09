from flask import Flask, jsonify
import requests
import os
from dotenv import load_dotenv


load_dotenv()

app = Flask(__name__)

# Load API key securely
COHERE_API_KEY = os.getenv("COHERE_API_KEY")  # Store API key in .env file
if not COHERE_API_KEY:
    raise ValueError("COHERE_API_KEY is not set in environment variables!")

API_URL = "https://api.cohere.ai/v1/generate"
HEADERS = {
    "Authorization": f"Bearer {COHERE_API_KEY}",
    "Content-Type": "application/json"
}

def summarize_reviews():
    """Summarizes a list of movie reviews using Cohere's API."""
    data = {
        "model": "command",
        "prompt": "Summarize these movie reviews:\nThe movie was really boring, but the end was nice.",
        "max_tokens": 100
    }
    
    response = requests.post(API_URL, headers=HEADERS, json=data)
    
    if response.status_code == 200:
        return response.json()["generations"][0]["text"]
    else:
        return f"Error: {response.json()}"

@app.route('/')
def home():
    summary = summarize_reviews()  # Call function and store result
    return jsonify({"summary": summary})  # Return JSON response

if __name__ == '__main__':
    app.run(debug=True)
