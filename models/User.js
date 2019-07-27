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
        id: {
          type: String
        },
        name: {
            type: String
        },
        purchasedAmount: {
            type: String
        },
        symbol:{
            type:String
        },
        purchasedPrice: {
            type: String
        },
        purchasedDate: {
            type:Date,
            default:Date.now
        },
        image: {
            type:String
        },
        purchasedPriceUsd: {
            type:String
        }
    }]
});

module.exports = User = mongoose.model('user', UserSchema);