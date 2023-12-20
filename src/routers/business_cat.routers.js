const { Router } = require("express");
const router = Router();
const businessCatCtrl = require("../controller/business_cat.controller");

router.post("/business-cat", businessCatCtrl.postBusinessCat);

module.exports = router;
