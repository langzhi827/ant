var UserDao = require('./dao/user');

UserDao.save({},function(){
    console.log(arguments);
});