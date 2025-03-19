import React, { useState } from 'react';
import '../App.css';

function ReviewForm({ movieTitle, movieId, userId }) {
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/add_review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        movie_id: movieId,
        review_text: review,
      }),
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to submit review');
        }
        return response.json();
      })
      .then(data => {
        alert(data.message);
        setReview('');
        window.location.reload();  // Refresh the page to show the new review
      })
      .catch(error => {
        console.error('Error submitting review:', error);
        alert('You must be logged in to submit a review.');
      });
  };

  return (
    <div className="review-section">
      <h2>Write a Review for {movieTitle}</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here..."
          rows="4"
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default ReviewForm;