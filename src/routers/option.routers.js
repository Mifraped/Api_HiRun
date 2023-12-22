const { Router } = require("express");
const router = Router();
const optionCtrl = require("../controller/option.controller");

router.post("/bus-option", optionCtrl.postBusinessOption);
router.get("/bus-option", optionCtrl.getBusinessOptions);
router.delete("/bus-option", optionCtrl.deleteBusinessOptions);

module.exports = router;
