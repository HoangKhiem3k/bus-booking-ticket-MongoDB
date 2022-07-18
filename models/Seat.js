const mongoose = require('mongoose');


// 1 trip có nhiều seat 
// const seats = ['A01','A02',....,'A12','B01','B02',....,'B12','C01','C02',....,'C12']
const SeatSchema = new mongoose.Schema({
    code: {type: String, required: true},
    isBooked: {type: Boolean, default: false},
})

const Seat = mongoose.model('Seat', SeatSchema, 'Seat');
module.exports = {
    Seat,
    SeatSchema
}