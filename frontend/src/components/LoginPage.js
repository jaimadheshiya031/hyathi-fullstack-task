import React, { useState } from 'react';
import '../components/loginRegister.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
        console.log(data);
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
        <button type="submit"className="button">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
