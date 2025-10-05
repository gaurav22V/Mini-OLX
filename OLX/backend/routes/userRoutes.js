const express = require('express');
const { register, login, profile } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/profile/:id', auth, profile );

module.exports = router;
