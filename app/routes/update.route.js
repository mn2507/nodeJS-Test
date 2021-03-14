const express = require('express');
const Update = require('../controllers/update.controller');

const router = express.Router();

router.post('/updatemyprofile', Update.updateProfile);

module.exports = router;