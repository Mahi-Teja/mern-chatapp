const Conversation = require("../../models/models.conversations");
const User = require("../../models/models.users");

const sendMsg = async (req, res) => {
  console.log(req.params.chatId);
  let chatId = req.params.chatId || null;
  const sxId = req.body.senderId;
  const rxId = req.body.recieverId;
  const message = req.body.message;
  let proceed = false;

  if (!chatId) {
    // create a conversation
    try {
      const response = await createChat();
      chatId = response._id;
      proceed = true;
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "Error..(line 21) :" + error,
      });
    }
  } else {
    proceed = true;
  }

  if (!proceed) {
    return res.json({
      success: false,
      message: "Something went wrong.",
    });
  }
  try {
    const userChat = Conversation.updateOne(
      { chatId },
      {
        $push: {
          messages: { message: message, sender: sxId },
        },
      }
    );
    return res.json({
      success: true,
      message: " conversation created and message sent",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error " + error,
    });
  }
};

const createChat = async (req, res) => {
  const sxId = req.body.sxId;
  const rxId = req.body.rxId;
  if (!sxId || !rxId) {
    return res.json({
      success: false,
      message: "sender or reciever dont exist",
    });
  }

  try {
    const response = await Conversation.create({
      userId: [sxId, rxId],
    });
    const user = await User.updateOne(
      { sxId },
      {
        $push: {
          chats: response._id,
        },
      }
    );

    return res.json({
      success: true,
      message: "chat created ",
      chatId: response._id,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "error creating chat" + error,
    });
  }
};

module.exports = { createChat, sendMsg };
