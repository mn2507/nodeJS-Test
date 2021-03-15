const express = require('express');
const Session = require('../controllers/session.controller');

const router = express.Router();

router.post('/session', Session.sessionControl);

module.exports = router;