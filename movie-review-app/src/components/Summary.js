import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

function Summary() {
  const navigate = useNavigate();
  const location = useLocation();
  const movieTitle = location.state?.movieTitle || 'this movie';
  const [summary, setSummary] = useState('');

  // Fetch summary from backend or external API
  useEffect(() => {
    fetch('http://localhost:5000/summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieTitle }),
    })
      .then(response => response.json())
      .then(data => {
        setSummary(data.summary);
      })
      .catch(error => console.log(error));
  }, [movieTitle]);

  return (
    <div className="container">
      <h1>Summary of Reviews</h1>
      <p>{summary || "Loading summary..."}</p>
      <button className="nav-button" onClick={() => navigate(-1)}>Back to Movie</button>
    </div>
  );
}

export default Summary;