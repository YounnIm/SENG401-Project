import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // TODO: Add backend logic to save user data
    console.log('Sign Up:', { username, password });
    navigate('/'); // Redirect to login page after signup
  };

  return (
    <div className="outer-container">
      <div className="login-container">
        <h1>Sign Up</h1>
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
          <button type="button" onClick={handleSignUp}>
            Sign Up
          </button>
        </form>
        <button type="button" onClick={() => navigate('/')} className="guest-button">
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default SignUp;