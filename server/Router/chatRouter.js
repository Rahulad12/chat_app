const express = require("express");
const messageRouter = express.Router();
const Message = require("../models/Message");
const logger = require("../Utils/logger");
messageRouter.get("/", async (req, res) => {
  logger.info("Message is getting ");
  try {
    const message = await Message.find({});
    logger.info("Message is send ");
    return res.json(message);
  } catch (error) {
    res.status(500);
    logger.error(error);
    return res.send(error);
  }
});

module.exports = messageRouter;
