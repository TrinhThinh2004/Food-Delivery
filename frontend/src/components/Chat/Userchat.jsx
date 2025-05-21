import React, { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import "./userchat.css";

const SOCKET_URL = "http://localhost:4000";

const UserChat = () => {
  const [username, setUsername] = useState("");
  const [receiver, setReceiver] = useState("Admin");
  const [message, setMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    if (connected && username) {
      socketRef.current = io(SOCKET_URL, { transports: ["websocket"] });
      socketRef.current.emit("register", username);

      socketRef.current.on("private_message", (msg) => {
        setMessages((prev) => [...prev, { sender: msg.sender, text: msg.content }]);
      });

      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [connected, username]);

  const handleRegister = () => {
    if (username) setConnected(true);
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

  const toggleChatBox = () => setIsOpen(!isOpen);

  return (
    <div className="chat-container">
      <button onClick={toggleChatBox} className="chat-toggle-button">
        {isOpen ? <span>X</span> : <span>💬</span>}
      </button>
      {isOpen && (
        <div className="chat-box">
          {!connected ? (
            <div className="chat-register">
              <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button onClick={handleRegister}>Connect</button>
            </div>
          ) : (
            <div className="chat-content">
              <div className="chat-messages">
                <ul>
                  {messages.map((msg, index) => (
                    <li
                      key={index}
                      className={msg.sender === username ? "msg-right" : "msg-left"}
                    >
                      <span className="sender">{msg.sender}:</span>{" "}
                      <span>{msg.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="chat-inputs">
                <input
                  type="text"
                  placeholder="Receiver's name"
                  value={receiver}
                  onChange={(e) => setReceiver(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendPrivateMessage()}
                />
                <button onClick={sendPrivateMessage}>Send</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserChat;