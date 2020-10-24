import React, { useState, useEffect } from 'react';

import blogService from './services/blogs.js';
import loginService from './services/login.js';

import Blog from './components/Blog.js';
import Notification from './components/Notification.js';

import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      localStorage.setItem('loggedBloglistUser', JSON.stringify(user));

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (err) {
      setMessage({ text: 'Wrong credentials', type: 'error' });
      setTimeout(() => {
        setMessage({});
      }, 3000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedBloglistUser');
    setUser(null);
  };

  const loginForm = () => {
    return (
      <>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </>
    );
  };

  const blogsForm = () => {
    return (
      <>
        <h2>Blogs</h2>
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>

        {blogs.map((b) => (
          <Blog key={b.id} blog={b} />
        ))}
      </>
    );
  };

  useEffect(() => {
    blogService.getAll().then((fetchedBlogs) => setBlogs(fetchedBlogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  return (
    <div>
      <Notification message={message} />
      {user ? blogsForm() : loginForm()}
    </div>
  );
};

export default App;
