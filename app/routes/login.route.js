const express = require('express');
const Login = require('../controllers/login.controller');

const router = express.Router();

router.post('/signin', Login.signIn);

module.exports = router;