require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../../models/models.users");
const secret = process.env.JWT_SECRET;

const loginUser = async (req, res) => {
  const {
    username,
    email,
    // ,password
  } = req.body;
  if (!username) {
    return res.json({ message: "fields cannot be empty" });
  }
  try {
    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      return res.json({ message: "User do not exist" });
    }
    // login
    const token = jwt.sign({ username, email }, secret);
    res.json({
      success: true,
      status: 200,
      message: "Login Success",
      username,
      token,
    });
  } catch (error) {
    res.json({ message: "Login Failed ", error });
  }
};

module.exports = loginUser;
