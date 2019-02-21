const express = require('express');
const router = express.Router();
const Shelter = require('../controllers/shelter');
const ShelterModel = require('../models/shelter');

router.post('/auth', Shelter.auth);

router.post('/register', Shelter.register);

router.get('/username', Shelter.username);

router.get('', function(req,res) {
    ShelterModel.find({}, function(err, foundShelters) {
        res.json(foundShelters);
    });
});

module.exports = router;