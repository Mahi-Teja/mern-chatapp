const Chats = require("../../models/models.chats");

const getChatsWithChatId = async (req, res) => {
  // TODO filter for a specific user and protect the route
  const chatId = req.params.chatId;
  try {
    const response = await Chats.findOne({ _id: chatId });
    res.json({
      success: true,
      message: "chat found",
      chats: response,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error: " + error,
      chats: [],
    });
  }
};

module.exports = getChatsWithChatId;
