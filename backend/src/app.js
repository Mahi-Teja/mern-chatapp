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
const Chats = require("./models/models.chats");
const getChatsWithChatId = require("./controllers/convs/controller.getChat");
const PORT = 3000;

app.use(express.json());
app.get("/", (req, res) => {
  // landing page
  res.send("Namste");
});
app.post("/register", createUser);
app.post("/login", loginUser);

////  -------protected routes----->
app.get("/home", auth, (req, res) => {
  res.send("Namste from Home");
});

app.get("/users", auth, getUsers); // all users
app.get("/user", userDetails); // one user

app.post("/newChat", createChat);
app.put("/chats/send/:chatId", sendMsg);
app.get("/chats/:chatId", getChatsWithChatId);

app.use("/group", group);

app.listen(PORT, () => {
  dbConnect();
  console.log(`
        ---------------------------

        server is up and running at
        http://localhost:${PORT}

        ----------------------------`);
});
