const mongoose = require("mongoose");

// Create schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    assets: [{
        name: {
            type: String
        },
        amount: {
            type: String
        }
    }]
});

module.exports = User = mongoose.model('user', UserSchema);