const mongoose = require("mongoose");
const Conversation = require("./models.conversations");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    // required:true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    // required:true,
  },
  // password: {
  //   type: String,
  //   // required:true,
  // },
  chats: [
    {
      type: mongoose.Types.ObjectId,
      ref: Conversation,
      //   // required:true,
      // unique: true,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
