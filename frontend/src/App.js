import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import PokemonListPage from './components/PokemonListPage';
import './App.css';

function App() {
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
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/pokemon" element={<PokemonListPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
