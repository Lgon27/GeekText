
const express = require('express');
const router = express.Router();

const userSchema = require('../models/users')
const billingSchema = require('../models/billing')
const shippingSchema = require('../models/shipping')


router.delete('/billing/:cardNumber', async (req, res) => {
    try {
        const removedPost = await billingSchema.deleteOne({ creditCardNumber: req.params.cardNumber })
        res.send(removedPost)
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router;