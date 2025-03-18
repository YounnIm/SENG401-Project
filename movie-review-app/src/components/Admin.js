import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Admin() {
  const navigate = useNavigate();
  const [movieTitle, setMovieTitle] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [movieImage, setMovieImage] = useState('');
  const [movies, setMovies] = useState([]);

  // Fetch movies from backend
  useEffect(() => {
    fetch('http://localhost:5000/movies')  // Adjust this URL as necessary
      .then(response => response.json())
      .then(data => {
        setMovies(data);
      })
      .catch(error => console.log(error));
  }, []);
  
  // Add movie
  const handleAddMovie = () => {
    if (movieTitle && movieDescription && movieImage) {
      const newMovie = {
        title: movieTitle,
        plot: movieDescription,
        poster_url: movieImage,
      };
  
      fetch('http://127.0.0.1:5000/add_movie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMovie),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);  // Log the response for debugging
          setMovies((prevMovies) => [...prevMovies, data.movie]); // Update the movies list using the latest state
          setMovieTitle('');
          setMovieDescription('');
          setMovieImage('');
        })
        .catch((error) => console.error('Error adding movie:', error));
    } else {
      alert('Please fill out all fields.');
    }
  };
  

  // Remove movie
  const handleRemoveMovie = (id) => {
    console.log('Deleting movie with ID:', id);
    fetch(`http://127.0.0.1:5000/movies/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id)))
      .catch((error) => console.error('Error deleting movie:', error));
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
          <button type="button" onClick={handleAddMovie}>Add Movie</button>
        </form>

        <h2>Current Movies</h2>
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <img
                src={movie.poster_url || "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-3-476x700.jpg"}
                alt={movie.title || "Default Movie Title"}
                className="movie-poster"
                onError={(e) => {
                  e.target.src = "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-1-3-476x700.jpg";
                }}
              />
              <div className="movie-details">
                <h3>{movie.title || "Untitled Movie"}</h3>
                <p>{movie.plot || "No description available."}</p>
              </div>
              <button type="button" onClick={() => handleRemoveMovie(movie.id)} className="remove-button">Remove</button>
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

