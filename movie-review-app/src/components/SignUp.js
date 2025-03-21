import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === "User registered!") {
          navigate('/');
        } else {
          alert(data.message);
        }
      })
      .catch(error => console.error('Error signing up:', error));
  };

  return (
    <div className="outer-container">
      <div className="login-container">
        <h1>Sign Up</h1>
        <div className="login-form">
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
          <div className="button-container">
            <button type="button" className="secondary-button" onClick={handleSignUp}>Sign Up</button>
            <button type="button" className="tertiary-button" onClick={() => navigate('/')}>Back to Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;