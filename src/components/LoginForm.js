import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = ({ target: { value } }) => setUsername(value);
  const handlePasswordChange = ({ target: { value } }) => setPassword(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ username, password });
    setUsername('');
    setPassword('');
  };

  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            name="Username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            name="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
