import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

function Summary() {
  const navigate = useNavigate();
  const location = useLocation();
  const movieTitle = location.state?.movieTitle || 'this movie';

  const summary = `${movieTitle} is widely praised for its complex narrative, stunning visuals, and thought-provoking themes. Users particularly enjoyed the performances and the engaging plot twists.`;

  return (
    <div className="container">
      <h1>Summary of Reviews</h1>
      <p>{summary}</p>
      <button className="nav-button" onClick={() => navigate(-1)}>Back to Movie</button>
    </div>
  );
}

export default Summary;
