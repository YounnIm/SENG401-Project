import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function MovieList() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  // Fetch movies from backend
  useEffect(() => {
    fetch('http://localhost:5000/movies')
      .then(response => response.json())
      .then(data => {
        setMovies(data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const handleLogout = () => {
    // Call the logout endpoint to clear the session on the server
    fetch('http://localhost:5000/logout', {
      method: 'POST',
      credentials: 'include', // Required for sessions
    })
      .then(response => response.json())
      .then(data => {
        // After successful logout, navigate to login page
        navigate('/');
      })
      .catch(error => {
        console.error('Error logging out:', error);
        // Even if there's an error, redirect to login
        navigate('/');
      });
  };

  return (
    <div className="container">
      <h1>Movie List</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item" onClick={() => handleMovieClick(movie.id)}>
            <img
              src={movie.poster_url || "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-3-476x700.jpg"}
              alt={movie.title || "Default Movie Title"}
              onError={(e) => {
                e.target.src = "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-3-476x700.jpg";
              }}
            />
            <h3>{movie.title || "Untitled Movie"}</h3>
          </div>
        ))}
      </div>
      <button className="nav-button" onClick={handleLogout}>Back to Login</button>
    </div>
  );
}

export default MovieList;