import React from 'react';
import { useNavigate } from 'react-router-dom';

function MovieList() {
  const navigate = useNavigate();

  // Hardcoded movie list remove when adding backend/database
  const movies = [
    { id: 1, title: 'Inception' },
    { id: 2, title: 'Interstellar' },
    { id: 3, title: 'The Dark Knight' },
  ];

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div>
      <h1>Movie List</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id} onClick={() => handleMovieClick(movie.id)}>
            {movie.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;