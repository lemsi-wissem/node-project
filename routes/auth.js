const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/register', async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = new User({username, password});
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/login', async (req, res) => {
    try{
        console.log(req.body);
        const {username, password} = req.body;
        const user = await User.findByCredentials(username, password).catch((error) => {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'});
        });
        const token = await user.generateAuthToken();
        res.send({user, token});
    }
    catch(error){
        res.status(500).send(error.message);
    }
});

module.exports = router;