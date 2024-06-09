const Reservation = require('../models/reservation');

async function checkConflict(req, res, next) {
    const { room, start, end } = req.body;
    const reservation = await Reservation.find({
        room,
        start: { $lt: end },
        end: { $gt: start }
    });
    if (reservation.length > 0) {
        return res.status(409).send({ error: 'Conflict with existing reservation!' });
    }
    next();
}

module.exports = checkConflict;