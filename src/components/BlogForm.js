import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createNewBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleTitleChange = ({ target: { value } }) => setTitle(value);
  const handleAuthorChange = ({ target: { value } }) => setAuthor(value);
  const handleUrlChange = ({ target: { value } }) => setUrl(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewBlog({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <>
      <h3>Create a new blog</h3>
      <form onSubmit={handleSubmit}>
        <div>
          title: <input onChange={handleTitleChange} value={title} />
        </div>
        <div>
          author: <input onChange={handleAuthorChange} value={author} />
        </div>
        <div>
          url: <input onChange={handleUrlChange} value={url} />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </>
  );
};

BlogForm.propTypes = {
  createNewBlog: PropTypes.func.isRequired,
};

export default BlogForm;
