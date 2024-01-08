const { Router } = require("express");
const router = Router();
const preferencesCtrl = require("../controller/preferences.controller");

router.get("/preferences", preferencesCtrl.getPreferences);

router.post("/preferences", preferencesCtrl.postPreferences)

router.put("/preferences", preferencesCtrl.putPreferences);

module.exports = router;