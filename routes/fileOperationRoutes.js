const router = require('express').Router();

const{ fileUpload } = require('../controllers/fileUploadContropller')

router.put('/', fileUpload)

module.exports = router;