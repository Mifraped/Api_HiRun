const { Router } = require("express");
const router = Router();
const imageCtrl = require("../controller/image.controller");

router.post("/img", imageCtrl.postImage);

module.exports = router;
