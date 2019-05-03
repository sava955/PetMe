const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adSchema = new Schema({
    title: { type: String, required: true, max: [128, 'Too long, max is 128 characters']},
    name: { type: String, rquired: true, lowercase: true },
    gender: { type: String, required: true, lowercase: true },
    age: { type: String, required: true, },
    city: { type: String, required: true, lowercase: true },
    street: { type: String, required: true },
    category: { type: String, required: true, lowercase: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    isUrgent: Boolean,
    phone: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    shelter: {
        type: Schema.Types.ObjectId, ref: 'Shelter'
    }
});

module.exports = mongoose.model('Ad', adSchema );