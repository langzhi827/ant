var BaseDao = require('./base');
var User = require('../models').User;
var util = require('util');

//var UserDao = new BaseDao(User);
function UserDao() {
    BaseDao.call(this, User);
}
util.inherits(UserDao, BaseDao);

module.exports = new UserDao();