const router = require('express').Router();
const { getPost, putPost } = require('../controllers/postsController');

router.get('/getPost/:postId', getPost);
router.post('/putPost', putPost);

module.exports = router;