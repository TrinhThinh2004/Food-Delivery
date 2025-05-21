import React, { useState, useRef } from "react";
import { io } from "socket.io-client";
import "./Adminchat.css";

const AdminChat = () => {
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);
  const username = "Admin";

  const connect = () => {
    socketRef.current = io("http://localhost:4000");
    socketRef.current.emit("register", username);
    setConnected(true);

    socketRef.current.on("private_message", (msg) => {
      setMessages((prev) => [...prev, { sender: msg.sender, text: msg.content }]);
    });
  };

  const sendPrivateMessage = () => {
    if (message && receiver && socketRef.current) {
      socketRef.current.emit("private_message", {
        sender: username,
        receiver,
        content: message,
      });
      setMessages((prev) => [...prev, { sender: username, text: message }]);
      setMessage("");
    }
  };

  return (
    <div className="admin-chat-container">
      {!connected ? (
        <div className="admin-connection">
          <button onClick={connect}>Connect</button>
        </div>
      ) : (
        <div className="admin-chat-box">
          <div className="admin-messages">
            <div className="admin-date-divider">Today</div>
            <div>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`admin-message-wrapper ${
                    msg.sender === username ? "admin-message-right" : ""
                  }`}
                >
                  <div
                    className={`admin-message ${
                      msg.sender === username
                        ? "admin-message-blue"
                        : "admin-message-gray"
                    }`}
                  >
                    <div className="admin-message-text">
                      {msg.sender}: {msg.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-input-section">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message..."
              onKeyDown={e => e.key === "Enter" && sendPrivateMessage()}
            />
            <button onClick={sendPrivateMessage}>Send</button>
          </div>

          <input
            type="text"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            placeholder="Enter receiver's name"
            className="admin-receiver-input"
          />
        </div>
      )}
    </div>
  );
};

export default AdminChat;