const {Station} = require('../../../models/Station');

const getStations = async (req, res,next) => {
    try {
        const stations = await Station.find();
        res.status(200).send(stations);
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}
const getStationById = async (req, res,next) => {
    const {id} = req.params;
    try {
        const station = await Station.findById(id);
        if(!station){
            return res.status(404).send("Station not found");
        }else{
            res.status(200).send(station);
        }
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}
const createStation = async (req, res,next) => {
    const newStation = new Station({
        name: req.body.name,
        address: req.body.address,
        province: req.body.province,
    });
    try {
        await newStation.save();
        res.status(201).send(newStation);
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}
const updateStationById = async (req, res,next) => {
    const {id} = req.params;
    const {name,address,province} = req.body;   
    try {
        const station = await Station.findById(id)
        if(!station){
            return res.status(404).send("Station not found");
        }else{
            station.name = name;
            station.address = address;
            station.province = province;
            await station.save();
            res.status(200).send(station);
        }
    }
    catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}
const deleteStationById = async (req, res,next) => {
    const {id} = req.params;
    try {
        const station = await Station.findById(id);
        if(!station){
            return res.status(404).send("Station not found");
        }else{
            await station.remove();
            res.status(200).send(station);
        }
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}
module.exports = { 
    createStation,
    getStations,
    getStationById,
    updateStationById,
    deleteStationById
};