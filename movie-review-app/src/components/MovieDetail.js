import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import ReviewForm from '../components/ReviewForm';

function MovieDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userId, setUserId] = useState(null);

  // Fetch movie details from backend
  useEffect(() => {
    fetch(`http://localhost:5000/movies/${id}`)
      .then(response => response.json())
      .then(data => {
        setMovie(data);
      })
      .catch(error => console.log(error));
  }, [id]);

  // Fetch reviews for the movie
  useEffect(() => {
    fetch(`http://localhost:5000/movies/${id}/reviews`)
      .then(response => response.json())
      .then(data => {
        setReviews(data);
      })
      .catch(error => console.log(error));
  }, [id]);

  // Fetch userId from localStorage or session
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  if (!movie) {
    return <h1>Loading...</h1>;
  }

  const handleSummarize = () => {
    navigate('/summary', { state: { movieTitle: movie.title } });
  };

  return (
    <div className="container">
      <h1>{movie.title}</h1>
      <img
        src={movie.poster_url || "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-3-476x700.jpg"}
        alt={movie.title || "Default Movie Title"}
        className="movie-poster"
        onError={(e) => {
          e.target.src = "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-3-476x700.jpg";
        }}
      />
      <p>{movie.plot || "No description available."}</p>

      <button onClick={handleSummarize}>Summarize Feedback</button>
      <button className="nav-button" onClick={() => navigate('/movies')}>Back to Movie List</button>

      {/* Pass userId to ReviewForm */}
      <ReviewForm movieTitle={movie.title} movieId={movie.id} userId={userId} />

      {/* Display reviews */}
      <div className="reviews-section">
        <h2>Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review">
              <p><strong>{review.username}</strong></p>
              <p>{review.review_text}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review this movie!</p>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;