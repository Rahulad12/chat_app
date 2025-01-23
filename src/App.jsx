import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

const App = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Fetch messages
        axios.get('http://localhost:5000/api/lovechatv1/message').then((res) => setMessages(res.data));

        // Listen for new messages
        socket.on('receive_message', (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => socket.off('receive_message');
    }, []);

    const sendMessage = () => {
        if (message.trim() && username.trim()) {
            const newMessage = { username, message };
            socket.emit('send_message', newMessage);
            setMessage('');
        }
    };

    return (
        <div className="h-screen bg-gray-100 flex flex-col items-center">
            <h1 className="text-2xl font-bold my-4">Mahirha Chat</h1>
            <div className="w-96 bg-white rounded-lg shadow p-4">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full border rounded p-2 mb-2"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="h-64 overflow-y-auto border rounded p-2 mb-4">
                    {messages.map((msg, index) => (
                        <div key={index} className="mb-2">
                            <strong>{msg.username}</strong>: {msg.message}
                        </div>
                    ))}
                </div>
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Type a message"
                        className="flex-1 border rounded p-2"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                        onClick={sendMessage}
                        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default App;
