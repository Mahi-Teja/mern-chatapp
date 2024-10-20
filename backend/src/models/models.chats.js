const mongoose = require("mongoose");
const User = require("./models.users");

// Chats
const chatsSchema = mongoose.Schema(
  {
    // users in the conersation
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    // messages in the chats and which user sent it.
    messages: [
      {
        message: {
          type: String,
          required: true,
        },
        sender: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    // Latest message (to highlight on the ui) and who sent it.(optional)
    // latestMessage: {
    //   message: String,
    //   sender: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "User",
    //   },
    // },
  },
  { timeStamp: true }
);

const Chats = mongoose.model("Chats", chatsSchema);

module.exports = Chats;

//user: Kunal --> chatss[rahul,krishna...]

// chatss:[kunal-> msg,Rahul->msg]
