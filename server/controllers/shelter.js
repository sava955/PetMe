const Shelter = require('../models/shelter');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

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
                username: shelter.username
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

exports.authMiddleware = function (req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        const shelter = parseToken(token);

        Shelter.findById(shelter.shelterId, function (err, user) {
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

exports.username = function (req, res) {
    const username = req.query.username;
    const query = username ? { username: username.toLowerCase() } : {};

    Shelter.find(query)
        .exec(function (err, foundShelters) {
            if (err) {
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }
            if (username && foundShelters.length === 0) {
                return res.status(422).send({ errors: [{ title: 'No shelters found!', detail: `Nema azila po imenu ${username}` }] });
            }
            return res.json(foundShelters)
        });
}

function parseToken(token) {
    return jwt.verify(token.split(' ')[1], config.SECRET);
}

function notAuthorized(res) {
    return res.status(422).send({ errors: [{ title: 'Not authorized!', detail: 'Morate se prijaviti!' }] });
}