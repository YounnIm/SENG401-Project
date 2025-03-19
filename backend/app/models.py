from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    #email = db.Column(db.String(255), unique=True, nullable=False) maybe add emails?
    password = db.Column(db.String(255), nullable=False)  # Store plain text passwords
    reviews = db.relationship("Review", backref="user", cascade="all, delete", lazy=True)


class Movie(db.Model):
    __tablename__ = "movies"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    plot = db.Column(db.Text)
    poster_url = db.Column(db.String(255))
    reviews = db.relationship(
        "Review", backref="movie", cascade="all, delete", lazy=True
    )


class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey("movies.id"), nullable=False)
    review_text = db.Column(db.Text, nullable=False)
 
