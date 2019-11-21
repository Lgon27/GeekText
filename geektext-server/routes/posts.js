//contains api routes for post http requests

const express = require('express');
const router = express.Router();

const userSchema = require('../models/users')
const billingSchema = require('../models/billing')
const shippingSchema = require('../models/shipping')

//post a user 
router.post('/user', (req, res) => {
    const user = new userSchema({
        loginID: req.body.loginID,
        loginPassword: req.body.loginPassword,
        name: req.body.name,
        emailAddress: req.body.emailAddress,
        nickname: req.body.nickname
    })

    user.save().then(data => {
        res.json(data);
    }).catch(err => {
        res.json({ message: err });
        console.log(err)
    })


})

router.post('/billing', (req, res) => {
    const billing = new billingSchema({
        loginID: req.body.loginID,
        streetAddress: req.body.streetAddress,
        creditCardNumber: req.body.creditCardNumber,
        creditCardCCV: req.body.creditCardCCV,
        creditCardExpirationDate: req.body.creditCardExpirationDate
    })

    billing.save().then(data => {
        res.json(data);
    }).catch(err => {
        res.json({ message: err });
    })

})

router.post('/shipping', (req, res) => {
    const billing = new shippingSchema({
        loginID: req.body.loginID,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode
    })

    billing.save().then(data => {
        res.json(data);
    }).catch(err => {
        res.json({ message: err });
    })

})




module.exports = router;
