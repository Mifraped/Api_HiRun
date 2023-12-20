const { Router } = require("express");
const router = Router();
const businessCtrl = require("../controller/business.controller");

router.post("/business", businessCtrl.postBusiness);

router.get("/business", businessCtrl.getBusiness)

module.exports = router;
