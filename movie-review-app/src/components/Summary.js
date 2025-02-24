import React from 'react';
import '../App.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';


function Summary() {
  const navigate = useNavigate();

  // Hardcoded summary
  const summary = "Inception is widely praised for its complex narrative, stunning visuals, and thought-provoking themes. Users particularly enjoyed the performances of Leonardo DiCaprio and the mind-bending plot twists.";

  return (
    <div className="container">
      <h1>Summary of Reviews</h1>
      <p>{summary}</p>
      <button className="nav-button" onClick={() => navigate(-1)}>Back to Movie</button>
    </div>
  );
}

export default Summary;