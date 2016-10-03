var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file


var config = require('./config');
var routerApi = require('./middlewares/auth'); 
var routes = require('./routes/index');
var users = require('./routes/users');
var todos = require('./routes/todos');
var auth = require('./routes/auth');

// load mongoose package
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.database)
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use('/css',  express.static(__dirname + '/css'));
app.use('/images',  express.static(__dirname + '/images'));
app.use('/js',  express.static(__dirname + '/js'));
app.set('superSecret', config.secret);

app.use('/', routes);
app.use('/auth', auth);
app.use('/api', routerApi);
app.use('/api/users', users);
app.use('/api/todos', todos);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
