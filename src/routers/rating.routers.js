const { Router } = require("express");
const router = Router();
const ratingCtrl = require("../controller/rating.controller");

router.post("/rating", ratingCtrl.postRating);
router.put("/rating", ratingCtrl.putRating);
router.get("/rating", ratingCtrl.getRating);

module.exports = router;
