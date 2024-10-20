const mongoose = require("mongoose");
const User = require("./models.users");

const grpChatSchema = mongoose.Schema(
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

const GrpChat = mongoose.model("GrpChat", grpChatSchema);

module.exports = GrpChat;
