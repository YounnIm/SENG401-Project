import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import Summary from './components/Summary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </Router>
  );
}

export default App;