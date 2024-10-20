const { Router } = reqire("express");
const router = Router();

router.get("/chat", getChat);
router.put("/chat", sendChat);

module.exports = router;
