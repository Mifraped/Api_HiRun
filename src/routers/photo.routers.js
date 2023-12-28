const { Router } = require('express');
const router = Router();
const multer = require('multer');
const photoCtrl = require('../controller/photo.controller');

const upload = multer({
    storage: multer.memoryStorage()
});

router.post('/photo', upload.single('photo'), photoCtrl.uploadPhoto);

module.exports = router;