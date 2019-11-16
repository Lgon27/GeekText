const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let list = new Schema ({
    list_name: {
        type : String
    },
    list_user: {
        type: String
    }

});
module.exports = mongoose.model('list', list);