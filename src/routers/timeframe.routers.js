const { Router } = require("express");
const router = Router();
const timeframeCtrl = require("../controller/timeframe.controller");

router.post("/timeframe", timeframeCtrl.postTimeframe);
router.delete("/timeframe", timeframeCtrl.deleteTimeframe);
router.get("/timeframe", timeframeCtrl.getTimeframe);

module.exports = router;
