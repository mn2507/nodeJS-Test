const express = require('express');
const GetCar = require('../controllers/getCar.controller');

const router = express.Router();

router.post('/getcarlist', GetCar.getCar);

module.exports = router;