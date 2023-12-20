const { Router } = require("express");
const router = Router();
const businessCtrl = require("../controller/business.controller");

router.post("/new-business", businessCtrl.postBusiness);

module.exports = router;
