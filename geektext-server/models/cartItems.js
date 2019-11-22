//Creates the database schema for a user
const mongoose = require('mongoose')


/*
DESCRIPTION: Stores cart information
*/
const cartItemSchema = mongoose.Schema({
    email: {
        type:String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    cover_image: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('cartItems', cartItemSchema)