const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    equipments: {
        type: [String],
        required: true,
    },
    availability: {
        type: Boolean,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;