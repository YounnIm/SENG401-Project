import unittest
import sys
import os
from app import create_app, db
from app.models import User, Movie, Review

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

class APITestCase(unittest.TestCase):
    def setUp(self):
        """Set up the test client and initialize the database."""
        self.app = create_app()
        self.client = self.app.test_client()
        self.app.config["TESTING"] = True
        with self.app.app_context():
            db.create_all()

    def tearDown(self):
        """Clean up after tests."""
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_user_registration(self):
        """Test user registration API."""
        response = self.client.post("/register", json={
            "username": "testuser",
            "password": "password123"
        })
        self.assertEqual(response.status_code, 201)
    
    def test_user_login(self):
        """Test user login API."""
        self.client.post("/register", json={
            "username": "testuser",
            "password": "password123"
        })
        response = self.client.post("/login", json={
            "username": "testuser",
            "password": "password123"
        })
        self.assertEqual(response.status_code, 200)

    def test_get_movies(self):
        """Test fetching movies."""
        response = self.client.get('/movies')
        self.assertEqual(response.status_code, 200)

    def test_get_reviews(self):
        """Test fetching reviews"""
        # Register and login a user
        self.client.post('/register', json={
            "username": "reviewer1",
            "password": "password123"
        })
        self.client.post('/login', json={
            "username": "reviewer1",
            "password": "password123"
        })

        # Add a movie
        self.client.post('/add_movie', json={
            "title": "Reviewable Movie",
            "plot": "Just for review testing",
            "poster_url": "http://poster.com/reviewable.jpg"
        })
        
        # Submit a review for movie ID 1
        self.client.post('/add_review', json={
            "movie_id": 1,
            "review_text": "This was a solid movie."
        })

        response = self.client.get('/movies/1/reviews')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"This was a solid movie", response.data)

    def test_view_other_users_reviews(self):
        """Test viewing reviews submitted by another user"""
        # Register and login as User A
        self.test_register_user("userA", "pass")
        self.test_login_user("userA", "pass")

        # Add a movie
        self.client.post('/add_movie', json={
            "title": "Tenet",
            "plot": "Time inversion thriller",
            "poster_url": "http://poster.com/tenet.jpg"
        })

        # Submit a review as User A
        self.client.post('/add_review', json={
            "movie_id": 1,
            "review_text": "Complex but brilliant!"
        })

        # Logout User A
        self.client.post('/logout')

        # Register and login as User B
        self.test_register_user("userB", "pass")
        self.test_login_user("userB", "pass")

        # User B views reviews for movie
        response = self.client.get('/movies/1/reviews')

        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Complex but brilliant", response.data)
        self.assertIn(b"userA", response.data)

    def test_review_summarization(self):
        """Test review summarization feature."""
        self.client.post('/register', json={
            "username": "testuser",
            "password": "test123"
        })

        # Log the user in to set session
        self.client.post('/login', json={
            "username": "testuser",
            "password": "test123"
        })
        # Add a movie so review can link to it
        self.client.post('/add_movie', json={
            "title": "Test Movie",
            "plot": "Test plot",
            "poster_url": "http://example.com/poster.jpg"
        })
        # Submit a review (while logged in)
        self.client.post('/add_review', json={
            "movie_id": 1,
            "review_text": "Loved it!"
        })
        response = self.client.post('/summary', json={
            "movieTitle": "Test Movie"
        })
        self.assertEqual(response.status_code, 200)

if __name__ == "__main__":
    unittest.main()
