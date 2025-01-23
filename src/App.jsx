import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

// Connect to the server using Socket.IO
const socket = io("http://localhost:5000");

const App = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch messages from the server
    axios
      .get("http://localhost:5000/api/lovechatv1/message")
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Error fetching messages:", err));

    // Listen for new messages
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() && username.trim()) {
      const newMessage = { username, message };
      socket.emit("send_message", newMessage);
      setMessage("");
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Mahirha Chat</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <strong>Chat Room</strong>
            </div>
            <div
              className="card-body overflow-auto"
              style={{ height: "400px" }}
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`d-flex ${
                    msg.username === username
                      ? "justify-content-end"
                      : "justify-content-start"
                  } mb-2`}
                >
                  <div
                    className={`p-2 rounded ${
                      msg.username === username
                        ? "bg-primary text-white"
                        : "bg-light"
                    }`}
                    style={{ maxWidth: "70%" }}
                  >
                    <strong>{msg.username}</strong>
                    <p className="mb-0">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="card-footer">
              <input
                type="text"
                placeholder="Enter your name"
                className="form-control mb-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Type a message"
                  className="form-control"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage} className="btn btn-primary">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
