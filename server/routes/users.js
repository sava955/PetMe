const express = require('express');
const router = express.Router();
const User = require('../controllers/user');

router.get('/:id', User.getUserById);

router.get('/:id/verified-user', User.authMiddleware, User.getUser);

router.post('/auth', User.auth);

router.post('/register', User.register);

router.post('', User.authMiddleware, User.createAd);

router.patch('/ad/:id', User.authMiddleware, User.updateAd);

router.delete('/ad/:id', User.authMiddleware, User.deleteAd);

router.patch('/:id', User.authMiddleware, User.update);

module.exports = router;