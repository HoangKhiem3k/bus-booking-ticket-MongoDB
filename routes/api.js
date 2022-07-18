const express = require('express');
const stationRouter = require('./controllers/stations/index');
const tripRouter = require('./controllers/trips/index');
const userRouter = require('./controllers/users/index');
const router = express.Router();

// create station
router.use('/api/stations',stationRouter)
router.use('/api/trips',tripRouter)
router.use('/api/users',userRouter)

module.exports = router;