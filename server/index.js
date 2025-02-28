const express = require("express");
const messageRouter = require("./Router/chatRouter");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const Database = require("./Config/db");
const Message = require("./models/Message");
const logger = require("./Utils/logger");
require("dotenv").config();

const app = express();
const httpServer = http.createServer(app); // Renamed from Server to httpServer
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// Database
Database();

// Routes
app.use("/api/lovechatv1/message", messageRouter);

// Socket
io.on("connection", (socket) => {
  logger.info("User connected");

  socket.on("send_message", async (data) => {
    logger.info("Message sent");
    const newMessage = new Message(data);
    await newMessage.save();
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    logger.info("User disconnected");
    console.log("User disconnected");
  });
});

// Start the server
const PORT = process.env.PORT;
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
