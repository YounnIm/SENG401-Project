from flask import request, jsonify
from app.controllers import add_review_controller, get_all_movies_controller, register_user_controller, login_user_controller
import requests
import os

def register_routes(app):

    @app.route('/movies', methods=['GET'])
    def get_movies():
        movies = get_all_movies_controller()
        return jsonify(movies), 200

    @app.route('/add_review', methods=['POST'])
    def add_review():
        data = request.json
        result = add_review_controller(data)
        return jsonify(result), 201

    @app.route('/register', methods=['POST'])
    def register():
        data = request.json
        result = register_user_controller(data)
        return jsonify(result), 201

    @app.route('/login', methods=['POST'])
    def login():
        data = request.json
        result = login_user_controller(data)
        return jsonify(result)

    @app.route('/')
    def home():
        
        print("Welcome Home")
        return "Hi"
        # cohere_api_key = os.getenv('COHERE_API_KEY')
        # headers = {
        #     "Authorization": f"Bearer {cohere_api_key}",
        #     "Content-Type": "application/json"
        # }
        # data = {
        #     "model": "command",
        #     "prompt": "Summarize these movie reviews:\\nThe movie was really boring, but the end was nice.",
        #     "max_tokens": 100
        # }
        # response = requests.post("https://api.cohere.ai/v1/generate", headers=headers, json=data)
        # if response.status_code == 200:
        #     summary = response.json()["generations"][0]["text"]
        #     return jsonify({"summary": summary})
        # else:
        #     return jsonify({"error": response.json()}), 500