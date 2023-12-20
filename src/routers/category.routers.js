const { Router } = require("express");
const router = Router();
const categoryCtrl = require("../controller/category.controller");

router.get("/category", categoryCtrl.getCategory);

module.exports = router;
