from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import requests
import os
from dotenv import load_dotenv


load_dotenv()

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = (
    "mysql+pymysql://root:Password@localhost/movie_review_db"
)

db = SQLAlchemy(app)


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    # email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(10), default="user")


class Movie(db.Model):
    __tablename__ = "movies"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    release_date = db.Column(db.Date, nullable=True)
    # ... other fields


class Review(db.Model):
    __tablename__ = "reviews"
    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.Integer, db.ForeignKey("movies.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    review_text = db.Column(db.Text, nullable=True)
    # Possibly a datetime field, etc.

    movie = db.relationship("Movie", backref="reviews", lazy=True)
    user = db.relationship("User", backref="reviews", lazy=True)


# Load API key securely
COHERE_API_KEY = os.getenv("COHERE_API_KEY")  # Store API key in .env file
if not COHERE_API_KEY:
    raise ValueError("COHERE_API_KEY is not set in environment variables!")

API_URL = "https://api.cohere.ai/v1/generate"
HEADERS = {
    "Authorization": f"Bearer {COHERE_API_KEY}",
    "Content-Type": "application/json",
}


def summarize_reviews():
    """Summarizes a list of movie reviews using Cohere's API."""
    data = {
        "model": "command",
        "prompt": "Summarize these movie reviews:\nThe movie was really boring, but the end was nice.",
        "max_tokens": 100,
    }

    response = requests.post(API_URL, headers=HEADERS, json=data)

    if response.status_code == 200:
        return response.json()["generations"][0]["text"]
    else:
        return f"Error: {response.json()}"


@app.route("/")
def home():
    summary = summarize_reviews()  # Call function and store result
    return jsonify({"summary": summary})  # Return JSON response


# Set Up Flask Routes

if __name__ == "__main__":
    app.run(debug=True)
