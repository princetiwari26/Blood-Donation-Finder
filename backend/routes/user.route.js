const { getProfile, searchBlood } = require('../controllers/user.controller');
const authMiddleware = require('../middleware/authMiddleware');
const router = require('express').Router();

router.get('/profile', authMiddleware, getProfile)
router.get('/search', searchBlood)

module.exports = router;