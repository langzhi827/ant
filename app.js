//var UserDao = require('./dao/user');

/*UserDao.save({
 username:'harry.lang',
 email:'harry.lang@yunzhihui.com',
 password:'123456'
 },function(){
 console.log(arguments);
 });*/

/*
 console.log('----------------')
 console.log(require('validator').isEmail('aha@s.com'))
 console.log('----------------')*/

/*UserDao.findOne({'$or': [
 {'username': 'harry.'},
 {'email': 'harry.lang@yunzhihui.com'}
 ]}, function (error, data) {
 console.log(arguments)
 });*/
var mailhHtml = '<div>您已注册成功，请点击以下链接完成验证：</div><a href="www.learnjs.cn">go</a>';
require('./helpers/send_email')('harry.lang@yunzhihui.com', 'ant用户注册验证', mailhHtml, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Message sent: ' + info.response);
    }
});