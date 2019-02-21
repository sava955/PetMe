const express = require('express');
const router = express.Router();
const Ad = require('../models/ad');
const Shelter = require('../models/shelter');
const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');

const UserCtrl = require('../controllers/user');
const ShelterCtrl = require('../controllers/shelter');

router.get('/secret1', UserCtrl.authMiddleware, function(req, res){
    res.json({"secret": true});
})

router.get('/secret2', ShelterCtrl.authMiddleware, function(req, res){
    res.json({"secret": true});
});


router.get('', function(req,res) {
    Ad.find({}, function(err, foundAds) {
        res.json(foundAds);
    });
});

router.get('/:id', function(req, res) {
    const adId = req.params.id;
    
    Ad.findById(adId)
      .populate('shelter', 'username -_id')
      .populate('user')
      .populate('ads')
      .exec(function(err, foundAd) {
        if(err) {
            res.status(422).send({errors: [{title: 'Ad error!', detail: 'Ovaj oglas nije moguće pronaći.'}]});
        }
        return res.json(foundAd);
      })
});

router.patch('/:id', ShelterCtrl.authMiddleware, function(req,res) {
    
    const adData = req.body;
    const shelter = res.locals.shelter;

    Ad.findById(req.params.id)
      .populate('shelter')
      .exec(function(err, foundAd) {
          if(err) {
              return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
          if(foundAd.shelter.id !== shelter.id) {
            return res.status(422).send({errors: [{title: 'Invalid user!', detail: 'Ovo nije vaš oglas!'}]});
          }
          foundAd.set(adData);
          foundAd.save(function(err) {
              if(err) {
                  return res.status(422).status({errors: normalizeErrors(err.errors)});
              }

              return res.status(200).send(foundAd); 
          });
      });
});

router.delete('/:id', ShelterCtrl.authMiddleware, function(req, res) {
    const shelter = res.locals.shelter; 

    Ad.findById(req.params.id)
      .populate('shelter', '_id')
      .exec(function(err, foundAd) {
          if (err) {
              return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
          if (shelter.id !== foundAd.shelter.id) {
              return res.status(422).send({errors: [{title: 'Invalid user!', detail: 'Ovo nije vaš oglas!'}]});
          }
          foundAd.remove(function(err) {
              if(err) {
                  return res.status(422).send({errors: normalizeErrors(err.errors)});
              }

              return res.json({'status': 'deleted'});
          });
      })
});


router.post('', ShelterCtrl.authMiddleware, function(req, res) {
    const { title, name, gender, age, city, street, category, image, description, isUrgent } = req.body;
    const shelter = res.locals.shelter;

    const ad = new Ad({ title, name, gender, age, city, street, category, image, description, isUrgent });
    ad.shelter = shelter;

    Ad.create(ad, function(err, newAd) {
        if(err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        Shelter.update({_id: shelter.i}, { $push: {ads: newAd}}, function(){});

        return res.json(newAd);
    })
})

module.exports = router;