const mongoose = require("mongoose");
const Conversation = require("./models.chats");

const messageSchema = mongoose.Schema(
  {
    message: {
      type: String,
      // required:true
    },
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      // required:true
    },
    default: [],
    chatId: {
      type: mongoose.Schema.ObjectId,
      ref: "Conversation",
      // required:true,
    },
  },
  {
    timeStamp: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
