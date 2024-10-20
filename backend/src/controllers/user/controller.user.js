const User = require("../../models/models.users");

// router.get("/users", getUsers);
const userDetails = async (req, res) => {
  const username = req.body.username;
  try {
    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      return res.json({
        succsess: false,
        message: " User not found",
      });
    }
    res.json({
      succsess: true,
      message: "Found User",
      user: foundUser,
    });
  } catch (error) {
    res.json({
      succsess: false,
      message: " error occured" + error,
    });
  }
};
module.exports = userDetails;
