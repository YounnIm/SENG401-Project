import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import ReviewForm from '../components/ReviewForm'; // Import the new review form

// Movie database
const movies = [
  { id: 1, title: 'Inception', description: 'A mind-bending thriller.', image: 'https://image.tmdb.org/t/p/w1280/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg' },
  { id: 2, title: 'Mufasa: The Lion King', description: 'A journey into the past of the Lion King.', image: 'https://image.tmdb.org/t/p/w1280/9bXHaLlsFYpJUutg4E6WXAjaxDi.jpg' },
  { id: 3, title: 'Captain America: Brave New World', description: 'Captain America returns in an epic adventure.', image: 'https://image.tmdb.org/t/p/w1280/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg' },
];

function MovieDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) {
    return <h1>Movie not found</h1>;
  }

  const handleSummarize = () => {
    navigate('/summary', { state: { movieTitle: movie.title } });
  };

  return (
    <div className="container">
      <h1>{movie.title}</h1>
      <img src={movie.image} alt={movie.title} />
      <p>{movie.description}</p>

      <button onClick={handleSummarize}>Summarize Feedback</button>
      <button className="nav-button" onClick={() => navigate('/movies')}>Back to Movie List</button>

      {/* Add review form */}
      <ReviewForm movieTitle={movie.title} />
    </div>
  );
}

export default MovieDetail;
