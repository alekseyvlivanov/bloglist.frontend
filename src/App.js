import React, { useState, useEffect } from 'react';

import blogService from './services/blogService.js';
import loginService from './services/loginService.js';

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

      blogService.setToken(user.token);
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

  const LoginForm = () => {
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

  const BlogForm = () => {
    const [newTitle, setNewTitle] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    const [newUrl, setNewUrl] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();

      const newBlog = { title: newTitle, author: newAuthor, url: newUrl };

      blogService
        .create(newBlog)
        .then((blog) => {
          setBlogs([...blogs, blog]);
          setMessage({ text: 'Added', type: 'success' });
          setTimeout(() => {
            setMessage({});
          }, 3000);
        })
        .catch((err) => {
          setMessage({ text: err.message, type: 'error' });
          setTimeout(() => {
            setMessage({});
          }, 3000);
        });
    };

    const handleNewTitle = ({ target: { value } }) => {
      setNewTitle(value);
    };

    const handleNewAuthor = ({ target: { value } }) => {
      setNewAuthor(value);
    };

    const handleNewUrl = ({ target: { value } }) => {
      setNewUrl(value);
    };

    return (
      <>
        <h2>Blogs</h2>
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>

        <h3>Create new</h3>
        <form onSubmit={handleSubmit}>
          <div>
            title: <input onChange={handleNewTitle} value={newTitle} />
          </div>
          <div>
            author: <input onChange={handleNewAuthor} value={newAuthor} />
          </div>
          <div>
            url: <input onChange={handleNewUrl} value={newUrl} />
          </div>
          <div>
            <button type="submit">create</button>
          </div>
        </form>

        <h3>Blog list</h3>
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
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <Notification message={message} />
      {user ? <BlogForm /> : <LoginForm />}
    </div>
  );
};

export default App;
