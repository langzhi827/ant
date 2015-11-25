var BaseDao = require('./base');
var User = require('../models').User;

var UserDao = new BaseDao(User);

module.exports = UserDao;