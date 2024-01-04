const { Router } = require("express");
const router = Router();
const bookingCtrl = require("../controller/booking.controller");

router.post("/booking", bookingCtrl.postBooking);
router.get("/booking", bookingCtrl.getBooking);
router.delete("/booking", bookingCtrl.deleteBooking);

module.exports = router;
