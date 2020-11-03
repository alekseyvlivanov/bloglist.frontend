import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, deleteBlog, likeBlog, canDelete }) => {
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

  const handleDelete = () => {
    if (window.confirm(`Delete blog "${title}" by ${author}?`)) {
      deleteBlog(blog);
    }
  };

  return (
    <div className="blog" style={blogStyle}>
      <div>
        &quot;{title}&quot; by {author}{' '}
        <button onClick={() => setFullView(!fullView)}>
          {fullView ? 'hide' : 'view'}
        </button>
      </div>
      {fullView && (
        <>
          <div>{url}</div>
          <div>
            likes <span className="likes">{likes}</span>{' '}
            <button onClick={() => likeBlog(blog)}>like</button>
          </div>
          <div>{name}</div>
          {canDelete && <button onClick={handleDelete}>delete</button>}
        </>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  likeBlog: PropTypes.func.isRequired,
  canDelete: PropTypes.bool.isRequired,
};

export default Blog;
