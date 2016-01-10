var express = require('express');
var resRule = require('./helpers/response_rule');
var config = require('./config');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var db = require('./models/db');
var path = require('path');

var app = express();
// environments
app.set('port', process.env.PORT || config.port);

// 视图引擎设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

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
app.use(session({
    name: config.auth_cookie_name,
    secret: 'ant',
    saveUninitialized: true,
    resave: false,
    store: new MongoStore({
        mongooseConnection: db,
        collection: 'ant_session',
        ttl: 5 * 24 * 60 * 60
    })
}));

//设置auth认证中间件
//app.use(require('./middlewares/auth'));
// 配置静态资源
app.use('/upload_file', express.static(path.join(__dirname, 'upload_file')));
app.use(express.static(path.join(__dirname, 'public')));

// router
app.use('/', require('./routers/views'));
app.use('/api', require('./routers/api'));

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