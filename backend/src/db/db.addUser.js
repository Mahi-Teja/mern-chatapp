const User = require("../models/models.users");

const addNewUser = (user) => {
  User.create({
    username: user.username,
    email: user.email,
    password: user.password,
    conversation: [],
  });
};
module.exports = addNewUser;
