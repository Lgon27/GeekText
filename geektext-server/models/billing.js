const mongoose = require('mongoose')

//User Billing Information Schema
const billingSchema = mongoose.Schema({
    loginID: {
        type: String,
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    creditCardNumber: {
        type: String,
        required: true
    },
    creditCardCCV: {
        type: Number,
        required: true
    },
    creditCardExpirationDate: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('billing', billingSchema)