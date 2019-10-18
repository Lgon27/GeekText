//contains api routes for post http requests

const express = require('express');
const router = express.Router();

const userSchema = require('../models/users')
const bookSchema = require('../models/books')

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
router.post('/books', (req, res) => {
    const book = new bookSchema({
            title: req.body.title,
            cover_image: req.body.cover_image,
            summary: req.body.summary,
            genre: req.body.genre,
            author: req.body.author,
            price: req.body.price,
            publish_date: req.body.publish_date,
            author_bio: req.body.author_bio
        })
    
        book.save().then(data => {
           res.json(data);
        }).catch(err => {
            res.json({ message: err });
        })

})

module.exports = router;
