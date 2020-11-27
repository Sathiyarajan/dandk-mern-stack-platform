const express = require('express')

const router = express.Router();

const {	requireSignin,isAuth,isAdmin} = require("../controllers/auth");

const {	userById} = require("../controllers/user");

//TODO: isAdmin can be called for admin user ETA final course

router.get('/secret/:userId', requireSignin, isAuth,isAdmin, (req,res) => {
const {	requireSignin} = require("../controllers/auth");

const {	userById} = require("../controllers/user");

router.get('/secret/:userId', requireSignin,(req,res) => {
	res.json({
		user: req.profile
	});
});

router.param('userId', userById)
module.exports = router;
