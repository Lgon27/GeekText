//contains api routes for post http requests

const express = require('express');
const router = express.Router();

const userSchema = require('../models/users')

router.post('/user', (req, res) => {
    const user = new userSchema({
        loginID: req.body.loginID,
        loginPassword: req.body.loginPassword,
        name: req.body.name,
        emailAddress: req.body.emailAddress,
        homeAddress: req.body.homeAddress,
        nickname: req.body.nickname,
        shippingAddress: req.body.shippingAddress,
        creditCardNumber: req.body.creditCardNumber,
        creditCardCCV: req.body.creditCardCCV,
        creditCardExpirationDate: req.body.creditCardExpirationDate
    })

    user.save().then(data => {
        res.json(data);
    }).catch(err => {
        res.json({ message: err });
    })


})




module.exports = router;
