const User = require('../models/user');
const Ad = require('../models/ad');
const Ads = require('../routes/ads');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

exports.getUserById = function(req, res) {
    const userId = req.params.id;

    User.findById(userId)
        .populate('ads')
        .exec(function (err, foundUser) {
            if (err) {
                return res.status(422).send({errors: [{title: 'Invalid user!', detail: 'Ovog korisnika nije moguće pronaći!'}] });
            }
            return res.json(foundUser);
        });
}

exports.getUser = function(req, res) {
    const requestedUserId = req.params.id;
    const user = res.locals.user;

    if (requestedUserId === user.id) {
        User.findById(requestedUserId)
            .populate('ads'/*, 'image name city title gender age _id'*/)
            .exec(function(err, foundUser) {
                if(err) {
                    return res.status(422).send({errors: normalizeErrors(err.errors)});
                }
        
                return res.json(foundUser);
            });

    } else {
        User.findById(requestedUserId)
            .select('-password')
            .exec(function(err, foundUser) {
                if (err) {
                    return res.status(422).send({errors: normalizeErrors(err.errors)});
                }

                return res.json(foundUser);
            })
    }
}

exports.update = function (req, res) {
    const userData = req.body;
    const user = res.locals.user;
    const userId = req.params.id;

    User.findById(userId, function (err, foundUser) {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }
            if (foundUser.id !== user.id) {
                return res.status(422).send({ errors: [{ title: 'Invalid user!', detail: 'Ovo nije vaš profil!' }] });
            }

            foundUser.set(userData);
            foundUser.save(function (err) {
                if (err) {
                    return res.status(422).status({ errors: normalizeErrors(err.errors) });
                }

                return res.status(200).send(foundUser);
            });
        });
}

exports.auth = function (req, res) {
    const { 
        email,
        password } = req.body;

        if (!email || !password) {
            return res.status(422).send({ errors: [{ title: 'Data missing', details: 'Unesite email i lozinku!' }] });
        }

        User.findOne({email}, function(err, user) {
            if(err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }

            if (!user) {
                return res.status(422).send({errors: [{title: 'Invalid user', detail: 'Korisnik ne postoji!'}]});
            }

            if (user.hasSamePassword(password)) {
                const token = jwt.sign({
                    userId: user.id,
                    username: user.username
                  }, config.SECRET, { expiresIn: '1h' });
                
                return res.json(token); 

            } else {
                return res.status(422).send({errors: [{title: 'Wrong data', detail: 'Pogrešan email ili lozinka!'}]});
            }

        })
}

exports.register = function (req, res) {
    const { 
        firstName,
        lastName,
        username,
        city,
        country,
        email,
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

    User.findOne({ email }, function (err, existingUser) {
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        if (existingUser) {
            return res.status(422).send({ errors: [{ title: 'Invalid email!', detail: 'Korisnik sa ovim emailom već postoji!' }] })
        }

        const user = new User({
            firstName,
            lastName,
            username,
            city,
            country,
            email,
            password
        });

        user.save(function (err) {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            } 
            
            return res.json({ 'registered': true }); 
        });
    });

}

exports.createAd = function (req, res) {
    
    const { title, name, gender, age, city, street, category, image, description, isUrgent, phone, email } = req.body;
    const user = res.locals.user;

    const ad = new Ad({ title, name, gender, age, city, street, category, image, description, isUrgent, phone, email });
    ad.user = user;

    Ad.create(ad, function (err, newAd) {

        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        User.update({ _id: user.id }, { $push: { ads: newAd } }, function () { });

        return res.json(newAd);
    });
}

exports.updateAd = function (req, res) {
    const adData = req.body;
    const user = res.locals.user;
    const adId = req.params.id;

    Ad.findById(adId)
        .populate('user')
        .exec(function (err, foundAd) {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }
            if (foundAd.user.id !== user.id) {
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

exports.deleteAd = function(req, res) {
    const user = res.locals.user;

    Ad.findById(req.params.id)
      .populate('user')
      .exec(function (err, foundAd) {
          if (err) {
              return res.status(422).send({ errors: normalizeErrors(err.errors) });
          }
          if (user.id !== foundAd.user.id ) {
              return res.status(422).send({ errors: [{title: 'Invalid user!', detail: 'Ovo nije vaš oglas!'}] });
          }
          foundAd.remove(function(err) {
              if (err) {
                  return res.status(422).send({ errors: normalizeErrors(err.errors) });
              }
              return res.json({ 'status': 'deleted' });
          });
      });
}

exports.authMiddleware = function(req, res, next) {
    const token = req.headers.authorization;

    if(token) {
        const user = parseToken(token);

        User.findById(user.userId, function(err, user) {
            if(err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }
            if(user) {
                res.locals.user = user;
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