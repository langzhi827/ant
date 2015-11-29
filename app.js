var express = require('express');
var routers = require('./routers');
var resRule = require('./helpers/response_rule');
var config = require('./config');
var http = require('http');
var bodyParser = require('body-parser');

var app = express();
// environments
app.set('port', process.env.PORT || config.port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// router
app.use('/api', routers);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json(resRule.error(err.message, err.stack));
});

//
var server = http.createServer(app).listen(app.get('port'));

server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    console.log(error);
    throw error;
}

function onListening() {
    console.log('Listening on port %d', app.get('port'));
}

process.on('uncaughtException', function (err) {
    console.log('----------------');
    console.log(err);
});

module.exports = app;