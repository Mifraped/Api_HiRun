const { Router } = require("express");
const router = Router();
const timeframeCtrl = require("../controller/timeframe.controller");

router.post("/timeframe", timeframeCtrl.postTimeframe);

module.exports = router;
