const router = require('express').Router();
const { verifyOtp, sendOTPToMail } = require('../controllers/otpControllers.js')

router.post('/verify', verifyOtp);

module.exports = router
