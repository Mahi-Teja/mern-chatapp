const User = require("../../models/models.users");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = getUsers;
