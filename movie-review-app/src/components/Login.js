import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'Admin' && password === '123') {
      navigate('/admin');  // Navigate to admin panel if credentials match
    } else {
      fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      })
        .then(response => response.json())
        .then(data => {
          if (data.message === "Login successful!") {
            navigate('/movies');  // Navigate to movies page for regular users
          } else {
            alert(data.message);
          }
        })
        .catch(error => console.error('Error logging in:', error));
    }
  };

  const handleGuestLogin = () => {
    navigate('/movies');
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <h1>CommunityReviews</h1>
        <p>Discover, review, and share your favorite movies</p>
      </div>
      
      <div className="login-container">
        <h2>Login</h2>
        <form className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" className="login-button" onClick={handleLogin}>Login</button>
          <button type="button" className="signup-button" onClick={() => navigate('/signup')}>Sign Up</button>
          <button type="button" className="guest-button" onClick={handleGuestLogin}>Continue as Guest</button>
        </form>
      </div>
      
      <div className="about-section">
        <h2>About this Website</h2>
        <div className="about-content">
          <p>Welcome to the ComunnityReviews App! This platform allows movie enthusiasts to discover new films, share their thoughts, and connect with other movie lovers.</p>
          <p>Key features:</p>
          <ul>
            <li>Browse a curated collection of movies</li>
            <li>Read and write reviews</li>
            <li>Create an account to save your favorite movies</li>
            <li>Join the community discussion about latest releases</li>
          </ul>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default Login;