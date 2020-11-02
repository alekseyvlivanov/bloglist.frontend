import React, { useEffect, useState, useRef } from 'react';

import blogService from './services/blogService.js';
import loginService from './services/loginService.js';

import Blog from './components/Blog.js';
import BlogForm from './components/BlogForm.js';
import LoginForm from './components/LoginForm.js';
import Notification from './components/Notification.js';
import Togglable from './components/Togglable.js';

import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState({});
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  const handleLogin = async (loginData) => {
    try {
      const user = await loginService.login(loginData);

      localStorage.setItem('loggedBloglistUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
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
      <Togglable buttonLabel="log in">
        <LoginForm handleLogin={handleLogin} />
      </Togglable>
    );
  };

  const createNewBlog = async (newBlog) => {
    try {
      const blog = await blogService.createBlog(newBlog);
      blogFormRef.current.toggleVisibility();
      setBlogs([...blogs, blog].sort((a, b) => b.likes - a.likes));
      setMessage({
        text: `A new blog "${newBlog.title}" by ${newBlog.author} created`,
        type: 'success',
      });
      setTimeout(() => {
        setMessage({});
      }, 3000);
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
      setTimeout(() => {
        setMessage({});
      }, 3000);
    }
  };

  const updateBlog = async (updatedBlog) => {
    try {
      await blogService.updateBlog(updatedBlog);
      const idx = blogs.findIndex((b) => b.id === updatedBlog.id);
      const updatedBlogs = [
        ...blogs.slice(0, idx),
        updatedBlog,
        ...blogs.slice(idx + 1),
      ];
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes));
      setMessage({
        text: `"${updatedBlog.title}" by ${updatedBlog.author} updated`,
        type: 'success',
      });
      setTimeout(() => {
        setMessage({});
      }, 3000);
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
      setTimeout(() => {
        setMessage({});
      }, 3000);
    }
  };

  const deleteBlog = async ({ id, title, author }) => {
    try {
      await blogService.deleteBlog(id);
      setBlogs(blogs.filter((b) => b.id !== id));
      setMessage({
        text: `"${title}" by ${author} deleted`,
        type: 'success',
      });
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
      setTimeout(() => {
        setMessage({});
      }, 3000);
    }
  };

  const likeBlog = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    await updateBlog(updatedBlog);
  };

  const blogForm = () => {
    return (
      <>
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>log out</button>
        </p>

        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createNewBlog={createNewBlog} />
        </Togglable>

        <h3>Blog list</h3>
        {blogs.map((b) => (
          <Blog
            key={b.id}
            blog={b}
            deleteBlog={deleteBlog}
            likeBlog={likeBlog}
            canDelete={b.user.username === user.username}
          />
        ))}
      </>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedBlogs = await blogService.getAll();
      setBlogs(fetchedBlogs.sort((a, b) => b.likes - a.likes));
    };
    fetchData();
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
      <h2>Blogs</h2>
      {user ? blogForm() : loginForm()}
    </div>
  );
};

export default App;
