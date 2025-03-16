import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import Summary from './components/Summary';
import SignUp from './components/SignUp'; 
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/movie-review-app" />} />

        {/* Define your routes */}
        <Route path="/movie-review-app" element={<Login />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/signup" element={<SignUp />} /> {/* Add this route */}
      </Routes>
      <footer>
        <p>MovieReviewApp</p>
      </footer>
    </Router>
  );
}

export default App;