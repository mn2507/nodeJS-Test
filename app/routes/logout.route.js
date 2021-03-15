const express = require('express');
const Logout = require('../controllers/logout.controller');

const router = express.Router();

router.post('/logout', Logout.logOut);

module.exports = router;