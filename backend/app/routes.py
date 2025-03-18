from flask import request, jsonify, session
from app.controllers import (
    register_user_controller,
    login_user_controller,
    add_review_controller,
    get_all_movies_controller,
    get_movie_by_id_controller,
    delete_movie_controller,
    add_movie_controller,
)
import requests
import os

def register_routes(app):
    @app.route('/register', methods=['POST'])
    def register():
        data = request.json
        result = register_user_controller(data)
        return jsonify(result), 201

    @app.route('/login', methods=['POST'])
    def login():
        data = request.json
        result = login_user_controller(data)
        if result.get("message") == "Login successful!":
            session['user_id'] = result['user_id']  # Store user ID in session
        return jsonify(result)

    @app.route('/logout', methods=['POST'])
    def logout():
        session.pop('user_id', None)  # Remove user ID from session
        return jsonify({"message": "Logged out successfully"}), 200

    @app.route('/movies', methods=['GET'])
    def get_movies():
        movies = get_all_movies_controller()
        return jsonify(movies), 200

    @app.route('/movies/<int:movie_id>', methods=['GET'])
    def get_movie(movie_id):
        movie = get_movie_by_id_controller(movie_id)
        if movie:
            return jsonify(movie), 200
        return jsonify({"error": "Movie not found"}), 404

    @app.route('/add_review', methods=['POST'])
    def add_review():
        data = request.json
        if 'user_id' not in session:
            return jsonify({"error": "User not logged in"}), 401
        data['user_id'] = session['user_id']  # Add user ID to review data
        result = add_review_controller(data)
        return jsonify(result), 201

    @app.route('/add_movie', methods=['POST'])
    def add_movie():
        data = request.json
        result = add_movie_controller(data)
        return jsonify(result), 201

    @app.route("/movies/<int:movie_id>", methods=["DELETE"])
    def remove_movie(movie_id):
        if delete_movie_controller(movie_id):
            return jsonify({"message": "Movie deleted successfully"})
        return jsonify({"error": "Movie not found"}), 404

    @app.route('/summary', methods=['POST'])
    def get_summary():
        data = request.json
        movie_title = data.get('movieTitle')

        cohere_api_key = os.getenv('COHERE_API_KEY')
        headers = {
            "Authorization": f"Bearer {cohere_api_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": "command",
            "prompt": f"Summarize reviews for the movie {movie_title}:",
            "max_tokens": 100
        }
        response = requests.post("https://api.cohere.ai/v1/generate", headers=headers, json=payload)

        if response.status_code == 200:
            summary = response.json()["generations"][0]["text"]
            return jsonify({"summary": summary})
        else:
            return jsonify({"error": "Failed to generate summary"}), 500

    @app.route('/')
    def home():
        return "Welcome to MovieReviewApp"