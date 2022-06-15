const express = require('express');
const {addCity, getCity, getAllCities, uploadCitites} = require('../controllers/cityController');


const router = express.Router();

router.post('/city/new', addCity);
router.post('/cities/upload', uploadCitites);
router.get('/cities/:id', getCity);
router.get('/cities', getAllCities);

module.exports = {
    routes: router
}