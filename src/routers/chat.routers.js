const { Router } = require('express');
const router = Router();
const chatCtrl = require('../controller/chat.controller');

router.get('/chat', chatCtrl.getChats);
// router.get('/chat/:id_chat', chatCtrl.getChat);

router.post('/chat', chatCtrl.createChat);

module.exports = router;
