const { Router } = require("express");
const router = Router();
const businessCatCtrl = require("../controller/business_cat.controller");

router.post("/business-cat", businessCatCtrl.postBusinessCat);
router.get("/business-cat", businessCatCtrl.getBusinessCat);

module.exports = router;
