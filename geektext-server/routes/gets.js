//contains api routes for get http requests
const express = require('express');
const router = express.Router();
const Users = require('../models/users')
const Books = require('../models/books')
const Reviews = require('../models/userReviews')


router.get('/users', async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
        console.log(users);
    } catch (err) {
        res.json({ message: err });
    }
})
// GET ALL BOOKS
router.get('/books', async (req, res) => {
    try {
        const books = await Books.find();
        res.json(books);
        console.log(books)
    } catch (err) {
        res.json({ message: err });
    }
})

router.get('/reviews', async (req, res) => {
    try {
         const userReview = await Reviews.find();
         res.json(userReview)
    } catch (err) {
        res.json({ message: err });
    }
})


module.exports = router;
