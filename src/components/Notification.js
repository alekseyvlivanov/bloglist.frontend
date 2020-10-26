import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message: { text, type } }) => {
  if (!text || !type) {
    return null;
  }

  return <div className={type}>{text}</div>;
};

Notification.propTypes = {
  message: PropTypes.exact({
    text: PropTypes.string,
    type: PropTypes.oneOf(['success', 'error']),
  }),
};

export default Notification;
