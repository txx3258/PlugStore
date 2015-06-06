var express = require('express');
var ROOT_PATH=require('./service/common/singleton').ROOT_PATH;
console.log(ROOT_PATH.getInstance(__dirname).getPath());

var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require("express-session");

var index = require('./routes/index');
var admin=require('./routes/admin');
var api=require('./routes/api');
var developer=require('./routes/developer');
var system=require('./routes/system');
var middleware=require('./service/common/middleware');
var config=require('./config.json');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//处理图标Favicon
app.use(middleware.handleFavicon);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);

//参数验证
//设置session
app.use(session(config["session"]));
app.use('/system', system);
app.use(middleware.validateLogin);
app.use('/developer', developer);
app.use('/admin', admin);
//handle final result
app.use(middleware.handleResult);

// production error handler
app.use(middleware.handleError);

module.exports = app;
