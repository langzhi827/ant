var express = require('express');
var router = express.Router();
var validator = require('validator');
var resRule = require('../helpers/response_rule');
var UserDao = require('../dao/user');
var sendEmail = require('../helpers/send_email');
var util = require('util');
var config = require('../config');
var encrypt = require('../helpers/encrypt');
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');

/*function setSession(res, user) {
 var expireDays = 20; // 有效期，单位：天
 //将两个Cookie设置为10天后过期
 res.cookie(config.auth_cookie_name, encrypt.sha1(user.id + user.email), {
 path: '/',
 maxAge: expireDays * 24 * 3600 * 1000
 });
 }*/

/**
 * 注册只需要 email/password即可
 *
 */
router.post('/register', function (req, res, next) {
    var email = validator.trim(req.body.email).toLowerCase();
    var password = validator.trim(req.body.password).toLowerCase();

    if (password === '' || email === '') {
        res.json(resRule.error('email或者密码不能为空!'));
        return;
    }
    if (!validator.isEmail(email)) {
        res.send(resRule.error('email格式不正确!'));
        return;
    }
    /*if (!validator.isBase64(password)) {
     res.json(resRule.error('密码必须为base64编码格式!'));
     return;
     }*/
    UserDao.findOne({'email': email}, function (error, data) {
        if (error) {
            return next(error);
        }
        if (data) {
            res.json(resRule.error('邮箱已经存在!'));
            return;
        }

        UserDao.save({username: email, email: email, password: password}, function (err, data) {
            if (err) {
                return next(err);
            }
            res.json(resRule.success('恭喜您注册成功，已发送激活邮件至您的邮箱，请激活邮箱！', data));

            var emailHtml = '<div>您已注册成功，请点击以下链接完成验证：</div><a href="www.learnjs.cn?email=%s">%s</a>';
            sendEmail(email, '用户注册验证', util.format(emailHtml, email, email), function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Message sent: ' + info.response);
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
/**
 * 登录（使用邮件登录）
 */
router.post('/login', function (req, res, next) {
    var email = validator.trim(req.body.email).toLowerCase();
    var password = validator.trim(req.body.password).toLowerCase();

    if (password === '' || email === '') {
        res.json(resRule.error('email或者密码不能为空!'));
        return;
    }
    UserDao.findOne({email: email}, function (error, user) {
        if (error) {
            return next(error);
        }

        if (!user) {
            res.json(resRule.error('邮箱不存在!'));
            return;
        }

        if (password !== user.password) {
            return res.json(resRule.error('密码输入错误!'));
        }
        // 设置session信息
        req.session.user = user;
        res.json(resRule.success('登录成功！', user));

    });

});

router.post('/set_head', function (req, res, next) {

    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = config.upload_head_url;
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024 * 1024; // 2M

    form.parse(req, function (err, fields, files) {
        if (err) {
            return next(err);
        }
        var extName = '';  //后缀名
        switch (files.upload.type) {
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            default :
                extName = '';
        }

        if (extName.length == 0) {
            fs.unlinkSync(files.upload.path); // 删除已上传头像
            res.json(resRule.error('只支持png和jpg格式图片！'));
            return;
        }
        /*var newName = encrypt.sha1(Math.random() + '' + (new Date()).getTime()) + '.' + extName;
         var newPath = path.join(form.uploadDir, newName);
         fs.renameSync(files.upload.path, newPath);  //重命名
         files.upload.path = newPath;*/

        // 将头像同步到user信息中
        var current_user = req.session.user;
        if (!current_user) {
            fs.unlinkSync(files.upload.path); // 删除已上传头像
            res.json(resRule.error('未登录！'));
            return;
        }
        // 更新user的head字段
        UserDao.findByIdAndUpdate(current_user._id, {head: files.upload.path}, function (error, user) {
            if (error) {
                return next(error);
            }
            res.json(resRule.success('上传成功！', user));
        });

    });

});

module.exports = router;