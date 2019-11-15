//contains api routes for get http requests
const express = require('express');
const router = express.Router();
const users = require('../models/users')
const billing = require('../models/billing')

//returns all users in the db
router.get('/users', async (req, res) => {
    try {
        const user = await users.find();
        res.json(user)
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
            res.status(202).send('Login Successful')
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






module.exports = router;