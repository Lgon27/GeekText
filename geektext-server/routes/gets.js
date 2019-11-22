//contains api routes for get http requests
const express = require('express');
const router = express.Router();

const users = require('../models/users')
const Books = require('../models/books')
const Reviews = require('../models/reviews')
const CartItems = require('../models/cartItems')
const Save_for_later = require('../models/save_for_later')
const PurchasedBooks = require('../models/purchasedbooks')
const billingSchema = require('../models/billing')
const shippingSchema = require('../models/shipping')

router.get('/users', async (req, res) => {
    try {
        const users = await users.find();
        res.json(users);

    } catch (err) {
        res.json({ message: err });
    }
})

// GET ALL BOOKS
router.get('/books', async (req, res) => {
    try {
        const books = await Books.find();
        res.json(books);

    } catch (err) {
        res.json({ message: err });
    }
})

//Cart Items
router.get('/cartItems', async (req, res) => {
    try {
        const cartItems = await CartItems.find();
        res.json(cartItems);

    } catch (err) {
        res.json({ message: err });
    }
})

//Save for Later Details
router.get('/save_for_later', async (req, res) => {
    try {
        const save_for_later = await Save_for_later.find();
        res.json(save_for_later);
        
    } catch (err) {
        res.json({ message: err });
    }
})

// User Details
router.get('/userDetails', async (req, res) => {
    try {
        const user = await users.find({ loginID: req.query.loginID });
        res.json(user);
        console.log(user);
    } catch (err) {
        res.json({ message: err });
    }
})

// Determine whether a user has purchased the book
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

// GET ALL BOOKS
router.get('/bookDetails', async (req, res) => {
    try {
        var bookDisplayName = req.query.bookTitle; // $_GET["bookTitle"]
        const books = await Books.find({title:bookDisplayName});
        console.log("Finding book: ", bookDisplayName, " Book Details: ", books);
        res.json(books);

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

//login check
router.get('/users/:loginID/:loginPassword', async (req, res) => {
    try {
        const userData = await users.find({ "loginID": req.params.loginID })
        var count = Object.keys(userData).length

        if (count > 0 && req.params.loginPassword == userData[0].loginPassword) {
            res.status(202).send(userData)
        }
        else {
            res.status(404).send('Incorrect Credentials')
        }
    } catch (err) {
        res.json({ message: err })
    }

})

router.get('/billing/:loginID', async (req, res) => {
    try {
        const bill = await billing.find({ "loginID": req.params.loginID })
        res.json(bill)
    } catch (err) {
        res.json({ message: err });
    }
})

router.get('/specificUser/:loginID', async (req, res) => {
    try {
        const user = await users.find({ "loginID": req.params.loginID })
        res.json(user)
    } catch (err) {
        res.json({ message: err });
    }
})

router.get('/shipping/:loginID', async (req, res) => {
    try {
        const ship = await shipping.find({ "loginID": req.params.loginID })
        res.json(ship)
    } catch (err) {
        res.json({ message: err });
    }
})



module.exports = router;
