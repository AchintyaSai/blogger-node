const router = require('express').Router();
const { generateToken, verifyToken } = require('../controllers/authenticationCOntroller')

router.get('/generateToken', generateToken)
router.post('/verifyToken', verifyToken)

module.exports = router