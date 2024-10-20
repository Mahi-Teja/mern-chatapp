const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dbConnect = require("./db/db");
const createUser = require("./routes/auth/signup");
const userDetails = require("./controllers/user/controller.user");
const getUsers = require("./controllers/user/controller.AllUsers");
const loginUser = require("./routes/auth/login");
const auth = require("./middlewares/auth");
const group = require("./routes/chat/group");
const {
  createChat,
  sendMsg,
} = require("./controllers/convs/controller.sendMsg");
const Conversation = require("./models/models.conversations");
const PORT = 3000;

app.use(express.json());
app.get("/", (req, res) => {
  // landing page
  res.send("Namste");
});
app.post("/register", createUser);
app.post("/login", loginUser);

app.get("/home", auth, (req, res) => {
  res.send("Namste from Home");
});

app.get("/user", auth, userDetails);
app.get("/users", auth, getUsers);
app.post("/newChat", createChat);
app.put("/chats/send/:chatId", sendMsg);

app.put("/chats/:chatId", async (req, res) => {
  const chatId = req.params.chatId;
  const sxId = req.body.sxId;
  const rxId = req.body.rxId;
  const message = req.body.message;
  // TODO check if the reciever and sx exits and protect the route
  try {
    const send = await Conversation.update(
      { chatId },
      { message: message, sender: sxId }
    );

    return res.json({
      success: true,
      message: "msg set successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error :" + error,
    });
  }
});
app.get("/chats", async (req, res) => {
  // TODO filter for a specific user and protect the route
  const chatId = req.body.chatId;
  console.log(chatId);
  try {
    const response = await Conversation.find({ chatId });
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
});

app.use("/group", group);

app.listen(PORT, () => {
  dbConnect();
  console.log(`
        ---------------------------

        server is up and running at
        http://localhost:${PORT}

        ----------------------------`);
});
