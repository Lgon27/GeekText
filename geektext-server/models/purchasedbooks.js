//Creates the database schema for a user
const mongoose = require('mongoose')


/*

*/
const purchasedBooks = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    bookTitle: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('purchasedbooks', purchasedBooks)
