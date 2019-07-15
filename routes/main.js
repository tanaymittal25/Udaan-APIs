const router = require('express').Router();
const async = require('async');

//const userObj = require('../models/user');

router.route('/')
.get((req, res, next) => {
    res.render('main/home');
});

module.exports = router;