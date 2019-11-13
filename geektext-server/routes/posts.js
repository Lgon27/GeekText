//contains api routes for post http requests

const express = require('express');
const router = express.Router();

const userSchema = require('../models/users')
const bookSchema = require('../models/books')
<<<<<<< HEAD
const cartItemSchema = require('../models/cartItems')
=======
const userReviewSchema = require('../models/reviews')
>>>>>>> 90e86d8797d938b6c496dcebf9c5b049b09df477

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
router.post('/cart', (req, res) => {
    const cartItem = new cartItemSchema({
            email: req.body.email,
            title: req.body.title,
            cover_image: req.body.cover_image,
            author: req.body.author,
            price: req.body.price,
        })
    
        cartItem.save().then(data => {
           res.json(data);
           console.log(data)
        }).catch(err => {
            res.json({ message: err });
        })

})


router.post('/reviews', (req, res) => {
    // console.log(req.body.review+"\n"+
    //             req.body.rating+"\n"+
    //             req.body.user_id+"\n"+
    //             req.body.bookTitle+"\n");

    const userReview = new userReviewSchema({
        rating: req.body.rating,
        review: req.body.review,
        user_id: req.body.user_id,
        bookTitle: req.body.bookTitle
    })

    console.log(userReview);

    userReview.save().then(data => {
        console.log("Success\n");
        res.json(data);
        // TODO: REFRESH UI!
    }).catch(err => {
        console.log("Error\n");
        res.json({ message: err });
    })


})

module.exports = router;
