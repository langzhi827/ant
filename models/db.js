var mongoose = require('mongoose');
var config = require('../config');

console.log('Running mongoose version %s', mongoose.version);

var db = mongoose.createConnection();

var option = {};

function connect() {
    try {
        db.open(config.mongodb.host, config.mongodb.database, config.mongodb.port, option);
    } catch (e) {
        console.error(e);
    }
};

db.on('connected', function () {
    console.log('Mongodb connected at ' + new Date());
});

db.on('open', function () {
    console.log('Mongodb open at ' + new Date());
});

db.on('disconnected', function () {
    console.log('Mongodb disconnected at ' + new Date());
    //重新连接
    connect();
});

db.on('error', function () {
    console.log('Mongodb error at ' + new Date());
    mongoose.disconnect();
});

connect();

module.exports = db;