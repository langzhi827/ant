var express = require('express');
var router = express.Router();
var validator = require('validator');
var resRule = require('../helpers/response_rule');
var UserDao = require('../dao/user');
var sendEmail = require('../helpers/send_email');

/**
 * 注册只需要 email/password即可
 *
 */
router.post('/register', function (req, res, next) {
    var email = validator.trim(req.body.email).toLowerCase();
    var password = validator.trim(req.body.password).toLowerCase();

    if (password === '' || email === '') {
        res.json(resRule.error('email或者密码不能为空!'));
    }
    if (validator.isEmail(email)) {
        res.json(resRule.error('email格式不正确!'));
    }
    if (validator.isBase64(password)) {
        res.json(resRule.error('密码必须为base64编码格式!'));
    }
    UserDao.findOne({'email': email}, function (error, data) {
        if (error) {
            return next(error);
        }
        if (data) {
            res.json(resRule.error('邮箱已经存在!'));
        }

        UserDao.save({email: email, password: password}, function (err, data) {
            if (err) {
                return next(err);
            }
            res.json(resRule.success('恭喜您注册成功，已发送激活邮件至您的邮箱，请激活邮箱！'));

            var mailhHtml = '<div>您已注册成功，请点击以下链接完成验证：</div><a href="www.learnjs.cn">go</a>';
            sendEmail(email, '用户注册验证', mailhHtml, function (error, info) {
                if (error) {
                    //console.log(error);
                } else {
                    //console.log('Message sent: ' + info.response);
                }
            });
        });
    });
    /*UserDao.findOne({'$or': [
     {'username': email},
     {'email': email}
     ]}, function (error, data) {
     if (error) {
     return next(error);
     }
     if(data){

     }
     });*/


});

module.exports = router;