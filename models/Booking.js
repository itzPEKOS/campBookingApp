const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
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
    },
    nameLastname: {
        type: String
    },
    tel: {
        type: String
    }
});

module.exports = mongoose.model('Booking', BookingSchema);