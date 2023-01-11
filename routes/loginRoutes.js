const router = require('express').Router();

const{ getLoginDetails, insertIntoSignupTable } = require('../controllers/loginController.js')

router.get('/', getLoginDetails);
router.post('/', insertIntoSignupTable)

module.exports = router;