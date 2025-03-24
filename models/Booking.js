const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    nameLastname: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    camp:{
        type: mongoose.Schema.ObjectId,
        ref: 'Camp',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', BookingSchema);