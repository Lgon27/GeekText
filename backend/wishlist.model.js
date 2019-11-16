const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let wishlist = new Schema ({
    wishlist_book: {
        type : String
    },
    wishlist_description: {
        type: String
    },
    wishlist_list : {
        type: String
    }

});

module.exports = mongoose.model('wishlist', wishlist);