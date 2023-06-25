import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import PokemonListPage from './components/PokemonListPage';
import './App.css'; 
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <Router>
      <div className="container">
        <h1>Pokemon Adoption App</h1>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/pokemon">Pokemon List</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/pokemon" element={<PokemonListPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/" element={<Navigate to="/login" />} />

        </Routes> 
      </div>
    </Router>
  );
}

export default App;
