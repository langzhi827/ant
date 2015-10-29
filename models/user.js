var mongoose = require('mongoose');
var Schema = mongoose.Schema; //相当表结构

var UserSchema = new Schema({
    username: String,
    email: String,
    head: String,
    sex: String,
    address: {
        province: String,
        city: String
    },
    remark: String
});

module.exports = mongoose.model('User', UserSchema); //相当于一个表