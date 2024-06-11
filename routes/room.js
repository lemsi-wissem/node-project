const express = require('express');
const router = express.Router();
const Room = require('../models/room');
const auth = require('../middleware/auth');

router.post('/room', auth, async (req, res) => {
    try {
        const room = new Room(req.body);
        await room.save();
        res.status(201).send(room);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get('/room/:id', auth, async (req, res) => {
    try {
        const rooms = await Room.findById(req.params.id);
        res.send(rooms);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/rooms', auth, async (req, res) => {
    try {
        const rooms = await Room.find({});
        res.send(rooms);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.patch('/room/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'capacity', 'equipments', 'availability', 'price', 'location', 'image'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!room) {
            return res.status(404).send();
        }
        res.send(room);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/room/:id', auth, async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) {
            return res.status(404).send();
        }
        res.send(room);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;