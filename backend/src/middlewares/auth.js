require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const User = require("../models/models.users");

const auth = (req, res, next) => {
  const authToken = req.headers.authorization || req.headers.Authorization;
  console.log(authToken);
  if (!authToken) {
    return res.json({ message: "no token" });
  }
  if (!authToken?.startsWith("Bearer")) {
    return res.json({ message: "forbidden" });
  }

  const token = authToken.split(" ")[1];

  const verified = jwt.verify(token, secret);

  if (!verified) {
    return res.send("Unauthorized access");
  }
  next();
};

module.exports = auth;
