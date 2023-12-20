const { Router } = require("express");
const router = Router();
const serviceCtrl = require("../controller/service.controller");

router.post("/new-service", serviceCtrl.postService);

module.exports = router;
