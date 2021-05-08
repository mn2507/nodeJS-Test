const express = require('express');
const Register = require('../controllers/register.controller');
const Login = require('../controllers/login.controller');
const Logout = require('../controllers/logout.controller');
const GetCar = require('../controllers/getCar.controller');
const Profile = require('../controllers/getProfile.controller');
const Update = require('../controllers/update.controller');
const Session = require('../controllers/session.controller');
const ForgotPass = require('../controllers/forgotpassword.controller');
const ChangePass = require('../controllers/changepassword.controller');

const router = express.Router();

router.post('/signup', Register.signUp);
router.post('/signin', Login.signIn);
router.post('/logout', Logout.logOut);
router.post('/getcarlist', GetCar.getCar);
router.post('/getprofile', Profile.getProfile);
router.post('/updatemyprofile', Update.updateProfile);
router.post('/session', Session.sessionControl);
router.post('/forgotpassword', ForgotPass.forgotPassword);
router.post('/changepassword', ChangePass.changePassword);

module.exports = router;