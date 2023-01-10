const router = require('express').Router();

const{ getLoginDetails } = require('../controllers/loginController.js')

router.get('/', getLoginDetails);

module.exports = router;