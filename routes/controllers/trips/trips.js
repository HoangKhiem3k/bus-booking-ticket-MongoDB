const {Trip } = require('../../../models/Trip')
const {Seat} = require('../../../models/Seat')

const seatCodes = [
    'A01','A02','A03','A04','A05','A06','A07','A08','A09','A10','A11','A12',
    'B01','B02','B03','B04','B05','B06','B07','B08','B09','B10','B11','B12',
    'C01','C02','C03','C04','C05','C06','C07','C08','C09','C10','C11','C12',
]
const createTrip = async (req, res,next) => {
    const {fromStation,toStation,startTime,price} = req.body;
    const seats = [];
    try {
        seatCodes.forEach(code => {
            const newSeat = new Seat({code})
            seats.push(newSeat)
        })
        const newTrip = new Trip({fromStation,toStation,startTime,price,seats})
        await newTrip.save();
        res.status(201).send(newTrip);
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}
module.exports = {
    createTrip,
}