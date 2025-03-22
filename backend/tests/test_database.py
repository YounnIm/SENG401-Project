import unittest
import sys
import os
from app import create_app, db
from app.models import User, Movie, Review

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

class DatabaseTestCase(unittest.TestCase):
    """Tests for database interactions"""

    def setUp(self):
        """Set up test environment"""
        self.app = create_app()
        self.app.config["TESTING"] = True
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()

    def tearDown(self):
        """Clean up after tests"""
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_add_user(self):
        """Test adding a user to the database"""
        with self.app.app_context():
            new_user = User(username="testuser", password="password123")
            db.session.add(new_user)
            db.session.commit()
            user = User.query.filter_by(username="testuser").first()
            self.assertIsNotNone(user)

    def test_add_movie(self):
        """Test adding a movie to the database"""
        with self.app.app_context():
            new_movie = Movie(title="Test Movie", plot="Test Plot", poster_url="http://test.com/poster.jpg")
            db.session.add(new_movie)
            db.session.commit()
            movie = Movie.query.filter_by(title="Test Movie").first()
            self.assertIsNotNone(movie)

    def test_add_review(self):
        """Test adding a review to the database"""
        with self.app.app_context():
            new_movie = Movie(title="Test Movie", plot="Test Plot", poster_url="http://test.com/poster.jpg")
            new_user = User(username="testuser", password="password123")
            db.session.add(new_movie)
            db.session.add(new_user)
            db.session.commit()
            new_review = Review(user_id=new_user.id, movie_id=new_movie.id, review_text="Great movie!")
            db.session.add(new_review)
            db.session.commit()
            review = Review.query.filter_by(user_id=new_user.id).first()
            self.assertIsNotNone(review)

if __name__ == "__main__":
    unittest.main()
