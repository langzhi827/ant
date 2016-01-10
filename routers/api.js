var express = require('express');
var router = express.Router();

var userRouter = require('./user');

router.use('/user', userRouter);

module.exports = router;