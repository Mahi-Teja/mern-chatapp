const mongoose = require("mongoose");
const User = require("./models.users");

// Chats
const conversationSchema = mongoose.Schema(
  {
    // users in the conersation
    userId: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    // messages in the conversation and which user sent it.
    messages: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Message",
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

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;

//user: Kunal --> conversations[rahul,krishna...]

// conversations:[kunal-> msg,Rahul->msg]
