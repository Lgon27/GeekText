const mongoose = require('mongoose')

//User Billing Information Schema
const billingSchema = mongoose.Schema({
    loginID: {
        type: String,
        required: true
    },
    streetAddress: {
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
        type: String,
        required: true
    }
})

module.exports = mongoose.model('billing', billingSchema)