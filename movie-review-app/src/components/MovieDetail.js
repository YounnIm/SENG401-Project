import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';

function MovieDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Hardcoded movie details
  const movie = {
    id: 1,
    title: 'Inception',
    description: 'A Movie',
    image: 'https://image.tmdb.org/t/p/w1280/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg',
  };

  const handleSummarize = () => {
    navigate('/summary');
  };

  return (
    <div className="container">
      <h1>{movie.title}</h1>
      <img src={movie.image} alt={movie.title} />
      <p>{movie.description}</p>
      <button onClick={handleSummarize}>Summarize Feedback</button>
      <button className="nav-button" onClick={() => navigate('/movies')}>Back to Movie List</button>
    </div>
  );
}

export default MovieDetail;