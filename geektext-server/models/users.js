//Creates the database schema for a user
const mongoose = require('mongoose')


/*
DESCRIPTION: Users can manage their 
login credentials (ID,password), 
personal information (name, email address, home
address),
 nickname for book rating and commenting, 
 credit card
information (multiple), 
and shipping address (multiple). 

Physical
addresses, email addresses, and credit card info should be
verified as valid. Passwords must meet our current security
standards 
*/
const userSchema = mongoose.Schema({
    loginID: {
        type: String,
        required: true
    },
    loginPassword: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    homeAddress: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('users', userSchema)
