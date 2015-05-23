var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var jifen=require('./routes/jifen');
var admin=require('./routes/admin');
var developer=require('./routes/developer')
var middleware=require('./service/common/middleware');

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
//app.use(express.multipart())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'upload')));


app.use('/', index);
app.use('/users', users);

//参数验证
app.use('/jifen', jifen);


//参数验证
app.use('/admin', admin);
app.use('/developer', developer);

//handle final result
app.use(middleware.handleResult);

// production error handler
app.use(middleware.handleError);

module.exports = app;
