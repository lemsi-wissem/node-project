const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const roomRouter = require('./routes/room');
const reservationRouter = require('./routes/reservation');
const app = express();

app.use(express.json());
app.use('/auth',authRouter);
app.use(roomRouter);
app.use(reservationRouter);

mongoose.connect('mongodb+srv://wissemkill:AKWFL4zCOedOOoLl@cluster0.dl7okqy.mongodb.net/blog?retryWrites=true&w=majority').then(() => {
    console.log('Connected to MongoDB');
    app.listen(9003, () => {
        console.log('Server is running on port 9003');
    })
}).catch((err) => {
    console.log(err.message);
})