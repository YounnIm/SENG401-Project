import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/movies');
  };

  const handleGuestLogin = () => {
    navigate('/movies');
  };

  return (
    <div className="outer-container">
      <div className="login-container">
        <h1>Login</h1>
        <form className="login-form">
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type="button" onClick={handleLogin}>Login</button>
          <button type="button" onClick={handleGuestLogin} className="guest-button">Continue as Guest</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
