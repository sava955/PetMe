const express = require('express');
const router = express.Router();
const Shelter = require('../controllers/shelter');
const ShelterModel = require('../models/shelter');

router.get('', Shelter.getShelterByUsername);

router.get('/:id', Shelter.getShelterById);

router.get('/:id/verified-shelter', Shelter.authMiddleware, Shelter.getShelter);

router.post('/auth', Shelter.auth);

router.post('/register', Shelter.register);

router.post('', Shelter.authMiddleware, Shelter.createAd);

router.patch('/ad/:id', Shelter.authMiddleware, Shelter.updateAd);

router.delete('/ad/:id', Shelter.authMiddleware, Shelter.deleteAd);

router.patch('/:id', Shelter.authMiddleware, Shelter.update);

module.exports = router;