const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    gender: { type: String },
    username: { 
        type: String,
        min: [4, 'Minimalan broj karaktera je 4'], 
        max: [32, 'Maksimalan broj karaktera je 32'],
        unique: true
    },
    birthDate: {
        type: String
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
    
    city: {
        type: String,
        required: 'Unesite vašu lokaciju'
    },
    country: {
        type: String,
        required: 'Unesite vašu lokaciju'
    },
    ads: [{
        type: Schema.Types.ObjectId, ref: 'Ad'
    }]
});

userSchema.methods.hasSamePassword = function(requestedPassword) {

    return bcrypt.compareSync(requestedPassword, this.password);
}

userSchema.pre('save', function(next){
    const user = this;

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });
})

module.exports = mongoose.model('User', userSchema );