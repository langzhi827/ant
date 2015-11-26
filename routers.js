var express = require('express');
var router = express.Router();

var userRouter = require('./routers/user');

router.use('/user', userRouter);

module.exports = router;