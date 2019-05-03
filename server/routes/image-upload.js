const express = require('express');
const router = express.Router();
const { normalizeErrors } = require('../helpers/mongoose');
const ShelterCtrl = require('../controllers/shelter');
const UserCtrl = require('../controllers/user');

const upload = require('../services/image-upload');

const singleUpload = upload.single('image');

router.post('/image-upload', ShelterCtrl.authMiddleware, function(req, res) {
   singleUpload(req, res, function(err) {
       if (err) {
           return res.status(422).send({errors: normalizeErrors(err.errors)});
       }
       console.log(req.file);

       return res.json({/*originalname:req.file.originalname, uploadname:req.file.fieldname*/'imageUrl': req.file.location});
   });
});

module.exports = router;