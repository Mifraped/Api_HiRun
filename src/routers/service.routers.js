const { Router } = require("express");
const router = Router();
const serviceCtrl = require("../controller/service.controller");

router.post("/service", serviceCtrl.postService);

module.exports = router;
