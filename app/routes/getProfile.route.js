const express = require('express');
const Profile = require('../controllers/getProfile.controller');

const router = express.Router();

router.post('/getprofile', Profile.getProfile);

module.exports = router;