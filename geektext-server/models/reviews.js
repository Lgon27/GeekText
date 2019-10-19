//Creates the database schema for a user
const mongoose = require('mongoose')


/*

*/
const userReviewSchema = mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    bookTitle: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('reviews', userReviewSchema)
