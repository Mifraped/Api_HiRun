const { Router } = require("express");
const router = Router();
const businessCatCtrl = require("../controller/business_cat.controller");

router.post("/business-cat", businessCatCtrl.postBusinessCat);
router.get("/business-cat", businessCatCtrl.getBusinessCat);
router.delete("/business-cat", businessCatCtrl.deleteBusinessCat);

module.exports = router;
