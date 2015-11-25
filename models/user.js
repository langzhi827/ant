var mongoose = require('mongoose');
var Schema = mongoose.Schema; //相当表结构

var UserSchema = new Schema({
    username: {type: String, unique: true},
    password: String,
    email: {type: String, unique: true},
    head: {type: String, default: '/img/default_head.png'},
    sex: String,
    address: {
        province: String,
        city: String
    },
    remark: String,
    create_date: {type: Date, default: Date.now},
    email_verify: {type: Boolean, default: false}
});

module.exports = mongoose.model('User', UserSchema); //相当于一个表