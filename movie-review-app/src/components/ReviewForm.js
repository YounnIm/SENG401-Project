import React, { useState } from 'react';
import '../App.css';

function ReviewForm({ movieTitle, movieId, userId }) {  // Accept userId as a prop
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId) {
      alert("You must be logged in to submit a review.");
      return;
    }

    fetch('http://localhost:5000/add_review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        movie_id: movieId,
        user_id: userId,  // Use the userId prop
        review_text: review,
      }),
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        setReview('');
      })
      .catch(error => console.error('Error submitting review:', error));
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