//contains api routes for get http requests
const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const users = require('../models/users')
const reviews = require('../models/userReviews')
=======
const Users = require('../models/users')
const Books = require('../models/books')
const Reviews = require('../models/userReviews')

>>>>>>> fcda78f5bcdc32df4bdec2c1668c3bd466210b0c

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
<<<<<<< HEAD
         const userReview = await reviews.find();
=======
         const userReview = await Reviews.find();
>>>>>>> fcda78f5bcdc32df4bdec2c1668c3bd466210b0c
         res.json(userReview)
    } catch (err) {
        res.json({ message: err });
    }
})
<<<<<<< HEAD





=======


>>>>>>> fcda78f5bcdc32df4bdec2c1668c3bd466210b0c
module.exports = router;
