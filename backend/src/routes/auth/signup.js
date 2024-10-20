const User = require("../../models/models.users");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

//signup
const createUser = async (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.json({ message: "Fields required" });
  }
  try {
    const foundUser = await User.findOne({ username });
    if (foundUser) {
      return res.json({ message: "user exists", user: foundUser });
    }
    // AddUserToDB
    await User.create({
      username,
      email,
      // password: password,
      conversation: [],
    });
    res.json({ message: "New User Created Succesfully" });
  } catch (error) {
    console.log("error creating New User: ERROR:->  " + error);
    res.json({
      sucsess: false,
      message: "Failed to create New user",
    });
  }
};

module.exports = createUser;
