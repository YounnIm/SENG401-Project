import React, { useState } from 'react';
import '../App.css';

function ReviewForm({ movieTitle }) {
  const [review, setReview] = useState('');
  const [submittedReview, setSubmittedReview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedReview(review);
    setReview('');
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

      {submittedReview && (
        <div className="review-display">
          <h3>Your Review:</h3>
          <p>{submittedReview}</p>
        </div>
      )}
    </div>
  );
}

export default ReviewForm;
