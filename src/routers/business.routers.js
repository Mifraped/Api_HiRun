const { Router } = require("express");
const router = Router();
const businessCtrl = require("../controller/business.controller");

router.post("/business", businessCtrl.postBusiness);

module.exports = router;
