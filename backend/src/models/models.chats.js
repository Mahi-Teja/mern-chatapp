const mongoose = require("mongoose");
const User = require("./models.users");

const chatSchema = mongoose.Schema(
  {
    chatName: {
      type: String,
      // required:true
      trim: true,
    },
    groupChat: {
      type: Boolean,
      // required:true
    },
    members: [
      {
        id: {
          type: mongoose.Schema.ObjectId,
          ref: User,
        },
        isAdmin: {
          type: Boolean,
        },
      },
    ],
  },
  { timeStamp: true }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
