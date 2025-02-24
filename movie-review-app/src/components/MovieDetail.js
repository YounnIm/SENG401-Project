import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function MovieDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Hardcoded movie details remove when backend/databse is made
  const movie = {
    id: 1,
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
  };

  const handleSummarize = () => {
    // Simulate generating a summary (no backend)
    navigate('/summary');
  };

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <button onClick={handleSummarize}>Summarize Feedback</button>
    </div>
  );
}

export default MovieDetail;