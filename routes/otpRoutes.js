const router = require('express').Router();
const { verifyOtp } = require('../controllers/otpControllers.js')

router.post('/verify', verifyOtp);

module.exports = router
