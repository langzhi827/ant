var mongoose = require('mongoose');
var config = require('../config');

console.log('Running mongoose version %s', mongoose.version);

var db = mongoose.connect(config.mongodb_url).connection;

db.on('connected', function () {
    console.log('Mongodb connected at ' + new Date());
});

db.on('open', function () {
    console.log('Mongodb open at ' + new Date());
});

db.on('disconnected', function () {
    console.log('Mongodb disconnected at ' + new Date());
});

db.on('error', function () {
    console.log('Mongodb error at ' + new Date());
});

module.exports = db;