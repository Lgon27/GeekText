//contains api routes for get http requests
const express = require('express');
const router = express.Router();
const users = require('../models/users')

router.get('/users', async (req, res) => {
    try {
        const user = await users.find();
        res.json(user)
    } catch (err) {
        res.json({ message: err });
    }
})

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





module.exports = router;