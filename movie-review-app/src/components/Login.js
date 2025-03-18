import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(null);  // Define userId and setUserId

  const handleLogin = () => {
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === "Login successful!") {
          setUserId(data.user_id);
          localStorage.setItem('userId', data.user_id);  // Store userId in localStorage
          navigate('/movies');
        } else {
          alert(data.message);
        }
      })
      .catch(error => console.error('Error logging in:', error));
  };

  const handleGuestLogin = () => {
    navigate('/movies');
  };

  return (
    <div className="outer-container">
      <div className="login-container">
        <h1>Login</h1>
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
          <button type="button" onClick={handleLogin}>Login</button>
          <button type="button" onClick={handleGuestLogin} className="guest-button">Continue as Guest</button>
          <button type="button" onClick={() => navigate('/signup')} className="guest-button">Sign Up</button>
          <button type="button" onClick={() => navigate('/admin')} className="guest-button">Admin</button>
        </form>
      </div>
    </div>
  );
}

export default Login;