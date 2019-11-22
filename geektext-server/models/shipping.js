const mongoose = require('mongoose')

//User Billing Information Schema
const shippingSchema = mongoose.Schema({

    loginID: {
        type: String,
        required: true
    },
    streetAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('shipping', shippingSchema)


