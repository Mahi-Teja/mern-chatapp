const Chat = require("../../models/models.grpChats");

const createGroup = async (req, res) => {
  const groupName = req.body.groupName;
  const members = req.body.members || [];
  const createrId = req.body.createrId || "";
  const membersWithAdmin = members?.map((p) => {
    return p.id === createrId ? (p.isAdmin = true) : (p.isAdmin = false);
  });

  try {
    const newGroup = await Chat.create({
      chatName: groupName,
      groupChat: true,
      members: membersWithAdmin,
    });
    res.json({
      message: `${groupName} group created`,
      id: newGroup._id,
    });
  } catch (error) {
    res.json({
      error: `Failed to create new group.
                 ERROR: ${error} `,
    });
  }
};
const deleteGroup = async (req, res) => {
  const groupId = req.params.groupId;
  if (!groupId) {
    return res.json({ message: "Invalid groupId" });
  }
  // TODO check group exists
  const foundGroup = await Chat.findOne({
    _id: groupId,
  });
  //  ----
  if (!foundGroup) {
    return res.json({ message: "No group found" });
  }
  await Chat.deleteOne({ _id: groupId });
  res.json({
    message: `${foundGroup.chatName} deleted`,
  });
  try {
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const getGroup = async (req, res) => {
  const groupId = req.params.groupId;
  if (!groupId) {
    return res.json({ message: "Invalid groupId" });
  }
  // TODO check group exists
  const foundGroup = await Chat.findOne({ _id: groupId });
  //  ----
  if (!foundGroup) {
    return res.json({ message: "No group found" });
  }
  res.json({
    message: "Group Found",
    group: foundGroup,
  });
  try {
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const renameGroup = async (req, res) => {
  const groupId = req.params.groupId;
  const newName = req.body.newName.trim();
  if (!groupId) {
    return res.json({ message: "Invalid groupId" });
  }
  // TODO check group exists
  const foundGroup = await Chat.findOne({ _id: groupId });
  //  ----
  if (!foundGroup) {
    return res.json({ message: "No group found" });
  }
  if (foundGroup.chatName === newName)
    return res.json({ message: `It is the current group name` });
  const updatedGroup = await Chat.updateOne(
    { _id: groupId },
    { chatName: newName }
  );
  res.json({
    message: `'${foundGroup.chatName}' renamed to '${newName}'`,
  });
  try {
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const addToGroup = async (req, res) => {
  const userIds = req.body.userIds;
  if (
    !userIds
    // ||userIds?.length<1
  )
    return res.json({ message: "select atleast one user." });
  try {
    // const foundUser = User.findOne({userIds})
    // if(!foundUser) return res.json({message:"User not found"})
    await Chat.insertOne({ userIds });
    res.json({
      message: `user added to `,
    });
  } catch (error) {}
};

module.exports = {
  createGroup,
  deleteGroup,
  getGroup,
  renameGroup,
  addToGroup,
};
