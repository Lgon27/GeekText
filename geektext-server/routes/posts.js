//contains api routes for post http requests

const express = require('express');
const router = express.Router();

const userSchema = require('../models/users')
const bookSchema = require('../models/books')
const cartItemSchema = require('../models/cartItems')
const userReviewSchema = require('../models/reviews')
const checkoutSchema = require('../models/purchasedbooks')
const billingSchema = require('../models/billing')
const shippingSchema = require('../models/shipping')
const saveLaterSchema = require('../models/save_for_later')
const wishlist = require('../models/wishlist.model');
const list = require('../models/list.model')
const PurchasedBooks = require('../models/purchasedbooks')


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
        quantity: req.body.quantity,
    })

    cartItem.save().then(data => {
        res.json(data);
        console.log(data)
    }).catch(err => {
        res.json({ message: err });
    })

})

router.post('/save_for_later', (req, res) => {
    const saveLater = new saveLaterSchema({
        email: req.body.email,
        title: req.body.title,
        cover_image: req.body.cover_image,
        author: req.body.author,
        price: req.body.price,
        quantity: req.body.quantity,
    })

    saveLater.save().then(data => {
        res.json(data);
        console.log(data)
    }).catch(err => {
        res.json({ message: err });
    })

})

router.post('/checkout', async (req, res) => {

    const checkout = new checkoutSchema({
        user_id: req.body.user_id,
        bookTitle: req.body.bookTitle
    })

    console.log(checkout);

    let userPurchasedBook = await PurchasedBooks.find({ user_id: checkout.user_id, bookTitle: checkout.bookTitle });

    // If user has not purchased book
    if (userPurchasedBook.length == 0) {

      checkout.save().then(data => {
          console.log("Success\n");
          res.json(data);
          // TODO: REFRESH UI!
      }).catch(err => {
          console.log("Error\n");
          res.json({ message: err });
      })

    }
    else {
      console.log("Book has already been checked out.")
    }

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
router.post('/wish/add',(req,res) => {
    const ans = new wishlist({
        wishlist_book:req.body.wishlist_book,
        wishlist_list:req.body.wishlist_list,
        title:req.body.title,
        cover_image:req.body.cover_image,
        summary:req.body.summary,
        genre:req.body.genre,
        author:req.body.author,
        price:req.body.price,
        publish_date:req.body.publish_date,
        author_bio:req.body.author_bio
    })
    ans.save()
    .then(ans => {
      res.status(200).json({'ans' : 'ans added'});
    })
    .catch(err => {
      res.status(400).send('failed add');
    });
})

router.post('/wish/update/:id',(req,res) => {
    let id = req.params.id;
    wishlist.findById(id, function(err, data){
        if (!data){
            res.status(404).send("data is not found");
          }
          else{
            data.wishlist_book = req.body.wishlist_book;
            data.wishlist_description = req.body.wishlist_description;
            data.wishlist_list = req.body.wishlist_list;
            data.save().then(data => {
              res.json('Updated');
            })
            .catch(err => {
              res.status(400).send("Update not completed");
            });
          }
        });
      });
router.post('/list/add',(req,res) =>{
    let ans = new list(req.body);
  ans.save()
    .then(ans => {
      res.status(200).json({'ans' : 'ans added'});
    })
    .catch(err => {
      res.status(400).send('failed add');
    });
})


router.post('/list/add/:user/:id',(req,res) =>{
    let user = req.params.user;
    let id = req.params.id;
    let ans = new list({list_name: id , list_user: user})
    ans.save()
      .then(ans => {
        res.status(200).json({'ans' : 'ans added'});
      })
      .catch(err => {
        res.status(400).send('failed add');
      });
})


module.exports = router;
