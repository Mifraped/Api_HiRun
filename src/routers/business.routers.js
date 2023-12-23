const { Router } = require("express");
const router = Router();
const businessCtrl = require("../controller/business.controller");

router.post("/business", businessCtrl.postBusiness);

router.get("/business", businessCtrl.getBusiness);
router.delete("/business", businessCtrl.deleteBusiness);
router.put("/business", businessCtrl.putBusiness);

module.exports = router;
