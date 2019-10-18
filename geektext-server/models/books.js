//Creates the database schema for a user
const mongoose = require('mongoose')


/*
DESCRIPTION: Stores Book information
*/
const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    cover_image: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    genre: {
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
    publish_date: {
        type: String,
        required: true
    },
    author_bio: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Books', bookSchema)
