var BaseDao = require('./base');
var User = require('../models').User;
var util = require('util');

var UserDao = new BaseDao(User);

UserDao.queryById = function () {

}

module.exports = new UserDao();