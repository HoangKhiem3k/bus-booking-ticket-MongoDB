
const express = require('express');
const { createTrip} = require('../../../routes/controllers/trips/trips');
const router = express.Router();

router.post('/', createTrip)
// router.get('/', getTrips)
// router.get('/:id', getTripById)
// router.put('/:id', updateTripById)
// router.delete('/:id', deleteTripById)
module.exports = router;