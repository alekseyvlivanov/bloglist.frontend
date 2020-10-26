import React, { useState } from 'react';

const Blog = ({ blog, updateBlog }) => {
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

  const handleLike = async () => {
    const updatedBlog = { ...blog, likes: likes + 1 };
    await updateBlog(updatedBlog);
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
        </>
      )}
    </div>
  );
};

export default Blog;
