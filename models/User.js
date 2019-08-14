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
    emaillConfirmed: {
      type:Boolean,
      default: false
    },
    requestedPasswordReset: {
      type:Boolean,
      default:false
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    theme: {
        type: String,
        default: "LIGHT"
    },
    autoRefresh: {
        type: Boolean,
        default: false
    },
    candleDuration: {
        type: String,
        default: 60
    },
    assets: [{
        id: {
          type: String
        },
        name: {
            type: String
        },
        symbol:{
            type:String
        },
        image: {
            type:String
        },
        transactions: [{
            purchasedPrice: {
                type: String
            },
            purchasedPriceUsd: {
                type:String
            },
            purchasedAmount: {
                type: String
            },
            purchasedDate: {
                type:Date,
                default:Date.now
            },
        }],
        notes:[{
            note:{
                type:String
            },
            date:{
                type:Date,
                default:Date.now
            }
        }]
    }]
});

module.exports = User = mongoose.model('user', UserSchema);