//contains api routes for get http requests
const express = require('express');
const router = express.Router();
const users = require('../models/users')
const reviews = require('../models/userReviews')

router.get('/users', async (req, res) => {
    try {
        const user = await users.find();
        res.json(user)
    } catch (err) {
        res.json({ message: err });
    }
})

router.get('/reviews', async (req, res) => {
    try {
         const userReview = await reviews.find();
         res.json(userReview)
    } catch (err) {
        res.json({ message: err });
    }
})





module.exports = router;
