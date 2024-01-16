const { Router } = require("express");
const router = Router();
const chatCtrl = require("../controller/chat.controller");

router.get("/chat", chatCtrl.getChats);

router.get("/messages/:chatId", chatCtrl.getMessages);

router.get("/chat/:id_chat", chatCtrl.getChat);

router.post("/chat", chatCtrl.createChat);

router.post("/message", chatCtrl.sendMessage);

router.get("/userChats", chatCtrl.getUserChats);

module.exports = router;
