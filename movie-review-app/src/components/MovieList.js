import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const movies = [
  { id: 1, title: 'Inception', image: 'https://image.tmdb.org/t/p/w1280/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg' },
  { id: 2, title: 'Mufasa: The Lion King', image: 'https://image.tmdb.org/t/p/w1280/9bXHaLlsFYpJUutg4E6WXAjaxDi.jpg' },
  { id: 3, title: 'Captain America: Brave New World', image: 'https://image.tmdb.org/t/p/w1280/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg' },
];

function MovieList() {
  const navigate = useNavigate();

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="container">
      <h1>Movie List</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item" onClick={() => handleMovieClick(movie.id)}>
            <img src={movie.image} alt={movie.title} />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
      <button className="nav-button" onClick={() => navigate('/')}>Back to Login</button>
    </div>
  );
}

export default MovieList;
