

const express = require('express');
const cartRoutes = express.Router();

let CartItems = require('../models/cartItems');

// Defined store route
cartRoutes.route('/add').post(function (req, res) {
  let cartitems = new CartItems(req.body);
  cartitems.save()
    .then(cartitems => {
      res.status(200).json({'cartItem': 'cartItem in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
cartRoutes.route('/').get(function (req, res) {
    CartItems.find(function(err, cartitems){
    if(err){
      console.log(err);
    }
    else {
      res.json(cartitems);
    }
  });
});

//  Defined update route - INCREASE QUANTITY
cartRoutes.route('/update/:id').post(function (req, res) {
    CartItems.findById(req.params.id, function(err, cartitems) {
    if (!cartitems)
      res.status(404).send("data is not found");
    else {
        cartitems.email = req.body.email;
        cartitems.title = req.body.title;
        cartitems.cover_image = req.body.cover_image;
        cartitems.author = req.body.author;
        cartitems.price = req.body.price;
        cartitems.quantity = req.body.quantity + 1;

        cartitems.save().then(cartitems => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

//  Defined update route - DECREASE QUANTITY
cartRoutes.route('/update/dec/:id').post(function (req, res) {
  CartItems.findById(req.params.id, function(err, cartitems) {
  if (!cartitems)
    res.status(404).send("data is not found");
  else {
      cartitems.email = req.body.email;
      cartitems.title = req.body.title;
      cartitems.cover_image = req.body.cover_image;
      cartitems.author = req.body.author;
      cartitems.price = req.body.price;
      cartitems.quantity = req.body.quantity - 1;
      cartitems.save().then(cartitems => {
        res.json('Update complete');
    })
    .catch(err => {
          res.status(400).send("unable to update the database");
    });
  }
  if (cartitems.quantity === 0) {
    cartitems.quantity = 1;  //if quantity greater than 1 have price * quantity
  }
});
});

// Defined delete | remove | destroy route
cartRoutes.route('/delete/:id').get(function (req, res) {
    CartItems.findByIdAndRemove({_id: req.params.id}, function(err, cartitems){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = cartRoutes;