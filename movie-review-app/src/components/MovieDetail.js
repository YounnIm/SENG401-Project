import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import ReviewForm from '../components/ReviewForm'; // Import the new review form

function MovieDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  // Fetch movie details from backend
  useEffect(() => {
    fetch(`http://localhost:5000/movies/${id}`)  // Adjust this URL as necessary
      .then(response => response.json())
      .then(data => {
        setMovie(data);
      })
      .catch(error => console.log(error));
  }, [id]);

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

      {/* Add review form */}
      <ReviewForm movieTitle={movie.title} />
    </div>
  );
}

export default MovieDetail;