const express = require('express');
const router = express.Router();

const userSchema = require('../models/users')
const billingSchema = require('../models/billing')
const shippingSchema = require('../models/shipping')
const wishlist = require('../models/wishlist.model');
const list = require('../models/list.model')


router.delete('/billing/:cardNumber', async (req, res) => {
    try {
        const removedPost = await billingSchema.deleteOne({ creditCardNumber: req.params.cardNumber })
        res.send(removedPost)
    } catch (err) {
        res.json({ message: err })
    }
})


router.delete('/shipping/:streetAddress', async (req, res) => {
    try {
        const removedPost = await shippingSchema.deleteOne({ streetAddress: req.params.streetAddress })
        res.send(removedPost)
    } catch (err) {
        res.json({ message: err })
    }
})
router.delete('/list/delete/:id',function(req,res){
    let id = req.params.id;
    list.findByIdAndDelete(id, function(err){
      if(err){
        res.send(err);
      }else {
        res.status(200).json({'ans' : 'ans removed'});
      }
    });
  });

router.delete('/wish/delete/:id',function(req,res){
    let id = req.params.id;
    wishlist.findByIdAndDelete(id, function(err){
      if(err){
        res.send(err);
      }else {
        res.status(200).json({'ans' : 'ans removed'});
      }
    });
  });
module.exports = router;
