const express = require('express');
const router = express.Router();
const Ad = require('../models/ad');
const Shelter = require('../models/shelter');
const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');

const UserCtrl = require('../controllers/user');
const ShelterCtrl = require('../controllers/shelter');

router.get('/secret1', UserCtrl.authMiddleware, function (req, res) {
    res.json({ "secret": true });
})

router.get('/secret2', ShelterCtrl.authMiddleware, function (req, res) {
    res.json({ "secret": true });
});

router.get('/:id/verify-shelter', ShelterCtrl.authMiddleware, function(req, res) {
    const shelter = res.locals.shelter;

    Ad.findById(req.params.id)
      .populate('shelter')
      .exec(function(err, foundAd) {
          if (err) {
              return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
          if (foundAd.shelter.id !== shelter.id) {
              return res.status(422).send({errors: [{title: 'Invalid shelter', detail: 'Ovo nije vaš oglas!'}]});
          }
          return res.json({status: 'verified'});
      });
});

router.get('/:id/verify-user', UserCtrl.authMiddleware, function(req, res) {
    const user = res.locals.user;

    Ad.findById(req.params.id)
      .populate('user')
      .exec(function(err, foundAd) {
          if (err) {
              return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
          if (foundAd.user.id !== user.id) {
              return res.status(422).send({errors: [{title: 'Invalid shelter', detail: 'Ovo nije vaš oglas!'}]});
          }
          return res.json({status: 'verified'});
      });
});

router.get('/:id', function (req, res) {
    const adId = req.params.id;

    Ad.findById(adId)
        .populate('shelter', 'username avatar _id')
        .populate('user', 'username avatar _id')
        .populate('ads')
        .exec(function (err, foundAd) {
            if (err) {
                res.status(422).send({ errors: [{ title: 'Ad error!', detail: 'Ovaj oglas nije moguće pronaći.' }] });
            }
            return res.json(foundAd);
        });
});

router.get('', function(req, res) {
    const city = req.query.city;
    const category = req.query.category;
    const gender = req.query.gender;

    const queryCity = city ? {city: city.toLowerCase()} : {};
    const queryCategory = category ? {category: category.toLowerCase()} : {};
    const queryGender = gender ? {gender: gender.toLowerCase()} : {};
  
    Ad.find(queryCity)
      .find(queryCategory)
      .find(queryGender)
      .populate('shelter')
      .exec(function(err, foundAds) {
  
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
  
      if (city && foundAds.length === 0) {
        return res.status(422).send({errors: [{title: 'No Rentals Found!', detail: `There are no rentals for city ${city}`}]});
      }

      if (category && foundAds.length === 0) {
        return res.status(422).send({errors: [{title: 'No Rentals Found!', detail: `Nije moguće pronaći!`}]});
      }

      if (gender && foundAds.length === 0) {
        return res.status(422).send({errors: [{title: 'No Rentals Found!', detail: `Nije moguće pronaći!`}]});
      }
  
      return res.json(foundAds);
    });
});

module.exports = router;