const { Router } = require("express");
const router = Router();
const filterCtrl = require("../controller/filters.controller");

router.get("/novedades", filterCtrl.getNovedades);

module.exports = router;
