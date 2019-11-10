//contains api routes for get http requests
const express = require('express');
const router = express.Router();

const Users = require('../models/users')
const Books = require('../models/books')
const Reviews = require('../models/reviews')

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
        // console.log("Calling Route")
        var bookDisplayName = req.query.bookTitle; // $_GET["bookTitle"]
        // console.log(bookDisplayName)

         let userReviews = await Reviews.find({bookTitle:bookDisplayName}).sort({$natural:-1});

        // If no reviews have been left
         if (userReviews.length == 0) {
           userReviews = [ { _id: 0,
                              rating: 0,
                              review: 'There is nothing here yet. Be the first to leave a review!',
                              user_id: 'GeekText Staff',
                              bookTitle: bookDisplayName,
                              __v: 0 } ]
         }

         res.json(userReviews)
    } catch (err) {
        res.json({ message: err });
    }
})

module.exports = router;
