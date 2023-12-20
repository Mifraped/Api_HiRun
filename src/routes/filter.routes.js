const { Router } = require("express");
const router = Router();
const filterCtrl = require("../controller/filters.controller");

router.get("/novedades", filterCtrl.getNovedades);

router.get("/results", filterCtrl.getResults);

module.exports = router;
