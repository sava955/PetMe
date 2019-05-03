const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shelterSchema = new Schema({
    username: { 
        type: String,
        min: [4, 'Minimalan broj karaktera je 4'], 
        max: [32, 'Maksimalan broj karaktera je 32'],
        unique: true,
        toLowerCase: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: 'Unesite vaš email',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        min: [4, 'Minimalan broj karaktera je 4'], 
        max: [32, 'Maksimalan broj karaktera je 32'],
        required: 'Unesite lozinku'
    },
    avatar: {
        type: String
    },
    city: {
        type: String, lowercase: true, required: true
    },
    street: {
        type: String, lowercase: true, required: true
    },
    idNumber: {
        type: String, lowercase: true, required: true
    },
    pib: {
        type: String, lowercase: true, required: true
    },
    phoneNmb: {
        type: String, lowercase: true, required: true
    },
    description: {
        type: String
    },
    images: [{
        type: String
    }],
    ads: [{
        type: Schema.Types.ObjectId, ref: 'Ad'
    }]
});

shelterSchema.methods.hasSamePassword = function(requestedPassword) {

    return bcrypt.compareSync(requestedPassword, this.password);
}

shelterSchema.pre('save', function(next){
    const shelter = this;

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(shelter.password, salt, function(err, hash) {
            shelter.password = hash;
            next();
        });
    });
})

module.exports = mongoose.model('Shelter', shelterSchema );