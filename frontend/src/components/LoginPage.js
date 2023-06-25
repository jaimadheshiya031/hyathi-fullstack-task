import React, { useState } from 'react';
import '../components/loginRegister.css';
import { useNavigate } from 'react-router-dom'
import PokemonListPage from './PokemonListPage';


function LoginPage({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError,setLoginError]=useState(false);
  const [token,setToken]=useState('');

  const navigate=useNavigate();


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send login data to the server
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        if(data.token){
        console.log(data.token);
        localStorage.setItem('authToken',data.token);
        setIsLoggedIn(true);
        setToken(data.token);
        navigate('/pokemon');
        }
        else{
          setLoginError(true);
        }
        
        // Reset the form
        setUsername('');
        setPassword('');
      })
      .catch(error => {
        console.error('Error logging in:', error);
      });
  };

  return (
    <div className="container">
      {/* <PokemonListPage token={token}/> */}
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        </div>
        <br />
        <div className="form-group">
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        </div>
        <br />
        {loginError && <p style={{color:'red'}}><strong>Invalid username or password. Please try again.</strong></p>}
        <button type="submit"className="button">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
