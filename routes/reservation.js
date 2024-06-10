const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const checkConflictMiddleware = require('../middleware/checkConflict');
const Reservation = require('../models/reservation');

router.post('/reservation', [auth,checkConflictMiddleware], async (req, res) => {
    try {
        const reservation = new Reservation(req.body);
        await reservation.save();
        res.status(201).send(reservation);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get('/reservation/:id', auth, async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        res.send(reservation);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.patch('/reservation/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['room', 'date', 'start', 'end'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }
    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!reservation) {
            return res.status(404).send();
        }
        res.send(reservation);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/reservation/:id', auth, async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) {
            return res.status(404).send();
        }
        res.send(reservation);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/reservations', auth, async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.send(reservations);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/reservations/me', auth, async (req, res) => {
    try {
        const reservations = await Reservation.find({ user: req.user._id }).populate('room');
        res.send(reservations);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/reservations/room/:id', auth, async (req, res) => {
    try {
        const reservations = await Reservation.find({ room: req.params.id });
        res.send(reservations);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Free rooms for a specific date

module.exports = router;