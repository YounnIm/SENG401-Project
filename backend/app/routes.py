from flask import request, jsonify
from app.controllers import delete_movie_controller, add_review_controller, get_all_movies_controller, register_user_controller, login_user_controller, add_movie_controller
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
    
    @app.route('/add_movie', methods=['POST'])
    def add_movie():
        data = request.json
        result = add_movie_controller(data)
        return jsonify(result), 201

    @app.route("/movies/<int:movie_id>", methods=["DELETE"])
    def remove_movie(movie_id):
        """API endpoint to delete a movie by ID."""
        if delete_movie_controller(movie_id):
            return jsonify({"message": "Movie deleted successfully"})
        return jsonify({"error": "Movie not found"}), 404

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