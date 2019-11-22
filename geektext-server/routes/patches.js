const express = require('express');
const router = express.Router();
const users = require('../models/users')
const billing = require('../models/billing')

//Update user name
router.patch('/name/:loginID', async (req, res) => {
    try {
        const updatedPost = await users.updateOne({ loginID: req.params.loginID }, { $set: { name: req.body.name } })
        res.send(updatedPost)
    } catch (err) {
        res.json({ message: err })
    }
})

//Update user password
router.patch('/password/:loginID', async (req, res) => {
    try {
        const updatedPost = await users.updateOne({ loginID: req.params.loginID }, { $set: { loginPassword: req.body.loginPassword } })
        res.send(updatedPost)
    } catch (err) {
        res.json({ message: err })
    }
})

//Update user email
router.patch('/email/:loginID', async (req, res) => {
    try {
        const updatedPost = await users.updateOne({ loginID: req.params.loginID }, { $set: { emailAddress: req.body.emailAddress } })
        res.send(updatedPost)
    } catch (err) {
        res.json({ message: err })
    }
})

//Update home address
router.patch('/address/:loginID', async (req, res) => {
    try {
        const updatedPost = await users.updateOne({ loginID: req.params.loginID }, { $set: { homeAddress: req.body.homeAddress } })
        res.send(updatedPost)
    } catch (err) {
        res.json({ message: err })
    }
})

//Update user nickname
router.patch('/nickname/:loginID', async (req, res) => {
    try {
        const updatedPost = await users.updateOne({ loginID: req.params.loginID }, { $set: { nickname: req.body.nickname } })
        res.send(updatedPost)
    } catch (err) {
        res.json({ message: err })
    }
})

router.patch('/updateAll/:loginID', async (req, res) => {
    try {
        const updatedPost = await users.updateOne({ loginID: req.params.loginID }, { $set: { name: req.body.name, emailAddress: req.body.emailAddress, nickname: req.body.nickname } })
        res.send(updatedPost)
    } catch (err) {
        res.json({ message: err })
    }
})

router.patch('/updateLogin/:loginID', async (req, res) => {
    try {
        const updatedPost = await users.updateOne({ loginID: req.params.loginID }, { $set: { loginID: req.body.loginID, loginPassword: req.body.loginPassword } })
        res.send(updatedPost)
    } catch (err) {
        res.json({ message: err })
    }
})







module.exports = router;