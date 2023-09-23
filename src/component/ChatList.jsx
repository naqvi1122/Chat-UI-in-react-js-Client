import React from "react";
import ChatMessage from "./ChatMessage";

const ChatList = ({ messages }) => {
  return (
    <div className="chat-list">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message.message} />
      ))}
    </div>
  );
};
export default ChatList;