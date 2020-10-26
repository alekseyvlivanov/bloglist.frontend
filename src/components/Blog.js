import React, { useState } from 'react';

const Blog = ({
  blog: {
    title,
    author,
    url,
    likes,
    user: { name },
  },
}) => {
  const [fullView, setFullView] = useState(false);

  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
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
            likes {likes} <button>like</button>
          </div>
          <div>{name}</div>
        </>
      )}
    </div>
  );
};

export default Blog;
