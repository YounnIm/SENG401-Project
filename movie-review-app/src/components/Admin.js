import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Admin() {
  const navigate = useNavigate();
  const [movieTitle, setMovieTitle] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [movieImage, setMovieImage] = useState('');

  const handleAddMovie = () => {
    // TODO: Add backend logic to save movie data
    console.log('Add Movie:', { movieTitle, movieDescription, movieImage });
    // Clear form
    setMovieTitle('');
    setMovieDescription('');
    setMovieImage('');
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
        <button type="button" onClick={() => navigate('/')} className="guest-button">
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default Admin;