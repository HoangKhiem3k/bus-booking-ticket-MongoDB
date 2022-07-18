
const express = require('express');
const { createUser, login } = require('./user');
const router = express.Router();

router.post('/', createUser)
router.post('/login', login)
// router.get('/', getTrips)
// router.get('/:id', getTripById)
// router.put('/:id', updateTripById)
// router.delete('/:id', deleteTripById)
module.exports = router;