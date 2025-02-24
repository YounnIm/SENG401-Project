import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate login (no backend)
    navigate('/movies');
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
}

export default Login;