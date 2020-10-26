import React, { useState } from 'react';

const Blog = ({ blog, updateBlog, deleteBlog, canDelete }) => {
  const {
    title,
    author,
    url,
    likes,
    user: { name },
  } = blog;

  const [fullView, setFullView] = useState(false);

  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: likes + 1 };
    updateBlog(updatedBlog);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete blog "${title}" by ${author}?`)) {
      deleteBlog(blog);
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        "{title}" by {author}{' '}
        <button onClick={() => setFullView(!fullView)}>
          {fullView ? 'hide' : 'view'}
        </button>
      </div>
      {fullView && (
        <>
          <div>{url}</div>
          <div>
            likes {likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{name}</div>
          {canDelete && <button onClick={handleDelete}>delete</button>}
        </>
      )}
    </div>
  );
};

export default Blog;
