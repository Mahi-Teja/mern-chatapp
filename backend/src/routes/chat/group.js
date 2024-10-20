const group = require("../../controllers/group/contoller.createGroup");

const { Router } = require("express");
const router = Router();

router.post("/create-group", group.createGroup);
router.delete("/delete-group/:groupId", group.deleteGroup);
router.get("/get-group/:groupId", group.getGroup);
router.put("/rename-group/:groupId", group.renameGroup);

router.post("addToGroup/:groupId", group.addToGroup);
// router.put("/removeFromGroup", removeFromGroup);
// router.get("/aboutGroup", aboutGroup);

module.exports = router;
