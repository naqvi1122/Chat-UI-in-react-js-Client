// ChatMessage.js

import React from 'react';
import PropTypes from 'prop-types';
import '../component/ChatMessageStyle.css'
const ChatMessage = ({ text, isMyMessage }) => {
  const messageClass = isMyMessage ? 'my-message' : 'other-message';

  return (
    <div className={`chat-message ${messageClass}`}>
      {text}
    </div>
  );
};

ChatMessage.propTypes = {
  text: PropTypes.string.isRequired,
  isMyMessage: PropTypes.bool.isRequired,
};



export default ChatMessage;
