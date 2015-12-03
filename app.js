var express = require('express');
var routers = require('./routers');
var resRule = require('./helpers/response_rule');
var config = require('./config');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var app = express();
// environments
app.set('port', process.env.PORT || config.port);
// create application/json parser
app.use(bodyParser.json());
/** bodyParser.urlencoded -> 返回只解析urlencoded body的中间件
 * create application/x-www-form-urlencoded parser
 * extended 允许在解析URL-encoded的时候选择querystring库（false）或者qs库
 * 比如：post --> {user[email]: "123@gmail.com", user[password]: "bGFuZ3poaQ=="}
 *
 *  querystring --> {user[email]: "123@gmail.com", user[password]: "bGFuZ3poaQ=="}
 *  qs --> { user: { email: '123@gmail.com', password: 'bGFuZ3poaQ==' } }
 *
 */
app.use(bodyParser.urlencoded({extended: false}));
// cookie 中间件,将cookie解析成json格式
app.use(cookieParser());
//通过session中间件设置session信息
var store = new MongoDBStore({
    //uri: config.mongodb_url,
    connection: require('./models/db').client,
    collection: 'ant_session',
    auto_reconnect:true
});
// Catch errors
store.on('error', function (error) {
    console.log('session store error---> ' + error.stack);
});
app.use(session({
    name: config.auth_cookie_name,
    secret: 'ant',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store
}));

//设置auth认证中间件
app.use(function (req, res, next) {
    console.log(req.session);
    next();
});

// router
app.use('/api', routers);
app.get('/', function (req, res, next) {
    res.end('11111');
});

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
var server = app.listen(app.get('port'));

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