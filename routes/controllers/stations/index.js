const express = require('express');
const { createStation, getStations, updateStationById,getStationById ,deleteStationById} = require('../../../routes/controllers/stations/stations');
const router = express.Router();

router.post('/', createStation)
router.get('/', getStations)
router.get('/:id', getStationById)
router.put('/:id', updateStationById)
router.delete('/:id', deleteStationById)
module.exports = router;