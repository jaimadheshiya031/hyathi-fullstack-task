import React, { useState } from 'react';

function RegisterPage() {
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

    // Send registration data to the server
    fetch('/register', {
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
        console.error('Error registering user:', error);
      });
  };

  return (
    <div className="container">
      <h2>Register</h2>
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
        <button type="submit"className="button">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
