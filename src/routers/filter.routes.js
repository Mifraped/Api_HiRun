const { Router } = require("express");
const router = Router();
const filterCtrl = require("../controller/filters.controller");

router.get("/testdb", filterCtrl.testDbConnection);

router.get("/novedades", filterCtrl.getNovedades);

router.get("/bestRated", filterCtrl.getBestRated);

router.get("/results", filterCtrl.getResults);

module.exports = router;
