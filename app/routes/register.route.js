const express = require('express');
const Register = require('../controllers/register.controller');

const router = express.Router();

router.post('/signup', Register.signUp);

module.exports = router;