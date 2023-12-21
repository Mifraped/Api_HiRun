const { Router } = require("express");
const router = Router();
const serviceCtrl = require("../controller/service.controller");

router.post("/service", serviceCtrl.postService);

router.get("/service", serviceCtrl.getService)

module.exports = router;
