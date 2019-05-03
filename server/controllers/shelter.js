const Shelter = require('../models/shelter');
const Ad = require('../models/ad');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

exports.getShelterByUsername = function(req, res) {
    const username = req.query.username;
    const query = username ? {username: username.toLowerCase()} : {};
  
    Shelter.find(query)
        .select('avatar username')
        .exec(function(err, foundShelter) {
  
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
  
      if (username && foundShelter.length === 0) {
        return res.status(422).send({errors: [{title: 'No Rentals Found!', detail: `Nema azila po imenu ${username}`}]});
      }
  
      return res.json(foundShelter);
    });
  };

exports.getShelterById = function (req, res) {
    const shelterId = req.params.id;

    Shelter.findById(shelterId)
        .populate('ads')
        .exec(function (err, foundShelter) {
            if (err) {
                res.status(422).send({ errors: [{ title: 'Shelter error!', detail: 'Ovaj azil nije moguće pronaći.' }] });
            }
            return res.json(foundShelter);
        });
}

exports.getShelter = function(req, res) {
    const requestedShelterId = req.params.id;
    const shelter = res.locals.shelter;

    if (requestedShelterId === shelter.id) {
        Shelter.findById(requestedShelterId)
               .populate('ads')
               .exec(function(err, foundShelter) {
            if(err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }
    
            return res.json(foundShelter);
        })
    } else {
        Shelter.findById(requestedShelterId)
            .select('-password')
            .populate('ads', 'title -_id')
            .exec(function(err, foundShelter) {
                if (err) {
                    return res.status(422).send({errors: normalizeErrors(err.errors)});
                }

                return res.json(foundShelter);
            });
    }
}

exports.auth = function (req, res) {
    const {
        email,
        password } = req.body;

    if (!email || !password) {
        return res.status(422).send({ errors: [{ title: 'Data missing', details: 'Unesite email i lozinku!' }] });
    }

    Shelter.findOne({ email }, function (err, shelter) {
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        if (!shelter) {
            return res.status(422).send({ errors: [{ title: 'Invalid user', detail: 'Korisnik ne postoji!' }] });
        }

        if (shelter.hasSamePassword(password)) {
            const token = jwt.sign({
                shelterId: shelter.id,
                username: shelter.username,
                avatar: shelter.avatar
            }, config.SECRET, { expiresIn: '1h' });

            return res.json(token);

        } else {
            return res.status(422).send({ errors: [{ title: 'Wrong data', detail: 'Pogrešan email ili lozinka!' }] });
        }

    })
}

exports.register = function (req, res) {
    const {
        username,
        email,
        city,
        street,
        idNumber,
        pib,
        phoneNmb,
        emailConfirmation,
        password,
        passwordConfirmation } = req.body;

    if (!email || !password) {
        return res.status(422).send({ errors: [{ title: 'Data missing', details: 'Unesite email i lozinku!' }] });
    }

    if (password !== passwordConfirmation) {
        return res.status(422).send({ errors: [{ title: 'Invalid password', detail: 'Potvrdite istu lozinku!' }] });
    }

    if (email !== emailConfirmation) {
        return res.status(422).send({ errors: [{ title: 'Invalid email', detail: 'Potvrdite isti email!' }] });
    }

    Shelter.findOne({ email }, function (err, existingShelter) {
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        if (existingShelter) {
            return res.status(422).send({ errors: [{ title: 'Invalid email!', detail: 'Korisnik sa ovim emailom već postoji!' }] })
        }

        const shelter = new Shelter({
            username,
            email,
            city, 
            street,
            idNumber,
            pib,
            phoneNmb,
            password
        });

        shelter.save(function (err) {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }

            return res.json({ 'registered': true });
        });
    });

}

exports.createAd = function (req, res) {
    
    const { title, name, gender, age, city, street, category, image, description, isUrgent, phone, email } = req.body;
    const shelter = res.locals.shelter;

    const ad = new Ad({ title, name, gender, age, city, street, category, image, description, isUrgent, phone, email });
    ad.shelter = shelter;

    Ad.create(ad, function (err, newAd) {

        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        Shelter.update({ _id: shelter.id }, { $push: { ads: newAd } }, function () { });

        return res.json(newAd);
    });
}

exports.updateAd = function (req, res) {
    const adData = req.body;
    const shelter = res.locals.shelter;
    const adId = req.params.id;

    Ad.findById(adId)
        .populate('shelter')
        .exec(function (err, foundAd) {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }
            if (foundAd.shelter.id !== shelter.id) {
                return res.status(422).send({ errors: [{ title: 'Invalid user!', detail: 'Ovo nije vaš oglas!' }] });
            }

            foundAd.set(adData);
            foundAd.save(function (err) {
                if (err) {
                    return res.status(422).status({ errors: normalizeErrors(err.errors) });
                }

                return res.status(200).send(foundAd);
            });
        });
}

exports.deleteAd = function (req, res) {
    const shelter = res.locals.shelter;

    Ad.findById(req.params.id)
        .populate('shelter')
        .exec(function (err, foundAd) {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }
            if (shelter.id !== foundAd.shelter.id) {
                return res.status(422).send({ errors: [{ title: 'Invalid user!', detail: 'Ovo nije vaš oglas!' }] });
            }
            foundAd.remove(function (err) {
                if (err) {
                    return res.status(422).send({ errors: normalizeErrors(err.errors) });
                }

                return res.json({ 'status': 'deleted' });
            });
        });
}

exports.update = function (req, res) {
    const shelterData = req.body;
    const shelter = res.locals.shelter;
    const shelterId = req.params.id;

    Shelter.findById(shelterId)
           .populate('ads')
           .exec( function (err, foundShelter) {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }
            if (foundShelter.id !== shelter.id) {
                return res.status(422).send({ errors: [{ title: 'Invalid user!', detail: 'Ovo nije vaš profil!' }] });
            }

            foundShelter.set(shelterData);
            foundShelter.save(function (err) {
                if (err) {
                    return res.status(422).send({ errors: normalizeErrors(err.errors) });
                }

                return res.status(200).send(foundShelter);   
            });
        });
}

exports.authMiddleware = function (req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        const shelter = parseToken(token);

        Shelter.findById(shelter.shelterId, function (err, shelter) {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }
            if (shelter) {
                res.locals.shelter = shelter;
                next();
            } else {
                return notAuthorized(res);
            }
        })
    } else {
        return notAuthorized(res);
    }
}

function parseToken(token) {
    return jwt.verify(token.split(' ')[1], config.SECRET);
}

function notAuthorized(res) {
    return res.status(422).send({ errors: [{ title: 'Not authorized!', detail: 'Morate se prijaviti!' }] });
}