const Chats = require("../../models/models.chats");
const User = require("../../models/models.users");

const sendMsg = async (req, res) => {
  console.log(req.params.chatId);
  let chatId = req.params.chatId || null;
  const sxId = req.body.senderId;
  const rxId = req.body.recieverId;
  const message = req.body.message;
  let proceed = false;

  if (!chatId) {
    // create a chats
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
    const response = await Chats.updateOne(
      { _id: chatId },
      {
        $push: {
          messages: {
            message: message,
            sender: sxId,
          },
        },
      }
    );
    return res.json({
      success: true,
      message: "Message sent",
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
      message: "Invalid request",
    });
  }

  try {
    const response = await Chats.create({
      members: [sxId, rxId],
    });
    const user = await User.updateOne(
      { _id: sxId },
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
