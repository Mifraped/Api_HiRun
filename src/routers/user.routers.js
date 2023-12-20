const { Router } = require("express");
const router = Router();
const userCtrl = require("../controller/user.controller");

router.get("/", userCtrl.getStart);
router.post("/register", userCtrl.postUser);
router.get("/rates", userCtrl.getRates)
router.post("/login", userCtrl.loginUser);

module.exports = router;
