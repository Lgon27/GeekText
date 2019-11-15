//contains api routes for get http requests
const express = require('express');
const router = express.Router();

const Users = require('../models/users')
const Books = require('../models/books')
const Reviews = require('../models/reviews')
const PurchasedBooks = require('../models/purchasedbooks')

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

router.get('/purchasedbooks', async (req, res) => {
    try {
        var userId = req.query.user_id; // $_GET["user_id"]
        var bookDisplayName = req.query.bookTitle; // $_GET["bookTitle"]

         let userPurchasedBook = await PurchasedBooks.find({user_id:userId, bookTitle:bookDisplayName});

        // If user has not purchased book
         if (userPurchasedBook.length == 0 ) {
            // Send some message back saying user hasn't purchased
            console.log("User has not purchased book");
            status = { purchased: false };
            res.json(status);
         }
         // If user has purchased book
         else {
            console.log("User has purchased book");
            status = { purchased: true };
            res.json(status);
         }

         // res.json(userReviews)
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
