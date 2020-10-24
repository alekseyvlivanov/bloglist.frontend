import React from 'react';

const Notification = ({ message: { text, type } }) => {
  if (!text || !type) {
    return null;
  }

  return <div className={type}>{text}</div>;
};

export default Notification;
