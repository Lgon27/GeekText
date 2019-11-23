const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let wishlist = new Schema ({
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
    },
    wishlist_list : {
        type: String
    }

});

module.exports = mongoose.model('wishlist', wishlist);