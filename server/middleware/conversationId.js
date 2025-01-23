// const Message = require("../models/Message");
// const logger = require("../Utils/logger");

// const conversationId = async (req, res, next) => {
//   try {
//     const conversationId = req.params.id;
//     const message = await Message.findOne({ conversationId });
//     if (!message) {
//       logger.error("Message not found");
//       return res.status(404).json({ message: "Message not found" });
//     }
//     req.message = message;
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = conversationId;
