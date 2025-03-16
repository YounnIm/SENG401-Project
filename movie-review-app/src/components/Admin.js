import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Admin() {
  const navigate = useNavigate();
  const [movieTitle, setMovieTitle] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [movieImage, setMovieImage] = useState('');
  const [movies, setMovies] = useState([
    { id: 1, title: 'Inception', description: 'A mind-bending thriller.', image: 'https://image.tmdb.org/t/p/w1280/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg' },
    { id: 2, title: 'Mufasa: The Lion King', description: 'A journey into the past of the Lion King.', image: 'https://image.tmdb.org/t/p/w1280/9bXHaLlsFYpJUutg4E6WXAjaxDi.jpg' },
    { id: 3, title: 'Captain America: Brave New World', description: 'Captain America returns in an epic adventure.', image: 'https://image.tmdb.org/t/p/w1280/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg' },
  ]);

  const handleAddMovie = () => {
    if (movieTitle && movieDescription && movieImage) {
      const newMovie = {
        id: movies.length + 1, // Simple ID generation (replace with a better method for production with backend database)
        title: movieTitle,
        description: movieDescription,
        image: movieImage,
      };
      setMovies([...movies, newMovie]);
      // Clear form
      setMovieTitle('');
      setMovieDescription('');
      setMovieImage('');
    } else {
      alert('Please fill out all fields.');
    }
  };

  const handleRemoveMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  return (
    <div className="outer-container">
      <div className="login-container">
        <h1>Admin Page</h1>
        <form className="login-form">
          <input
            type="text"
            placeholder="Movie Title"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Movie Description"
            value={movieDescription}
            onChange={(e) => setMovieDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Movie Image URL"
            value={movieImage}
            onChange={(e) => setMovieImage(e.target.value)}
          />
          <button type="button" onClick={handleAddMovie}>
            Add Movie
          </button>
        </form>

        <h2>Current Movies</h2>
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <img src={movie.image} alt={movie.title} className="movie-poster" />
              <div className="movie-details">
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveMovie(movie.id)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button type="button" onClick={() => navigate('/')} className="guest-button">
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default Admin;