const { Router } = require("express");
const router = Router();
const userCtrl = require("../controller/user.controller");
const { testConnection } = require("../database");

router.get("/", userCtrl.getStart);

router.get("/test-db", testConnection);

router.post("/login", userCtrl.loginUser);

module.exports = router;
