var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var crypto = require('crypto');

//passport stuff
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var bcrypt = require('bcrypt');
var db = require('./db.js');

//config is in config.js
var config = require('./config.js');

var users = require('./routes/users');
var usersconfirm = require('./routes/usersconfirm');
var routes = require('./routes/index');
var login = require('./routes/login');
var payments = require('./routes/payments');
var installer = require('./routes/installer');
var transactions = require('./routes/transactions');
var lessons = require('./routes/lessons');
var testthing = require('./routes/testthing');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(db);

app.use(session({secret: config.session.secret}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  //scub sensitive data before serial
  delete user.password;
  delete user.salt;
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    console.log("local auth", username, password);
    req.res.query.first("select * from users where email = $1 AND status='active';", [username], function(err, rows, results){
      console.log('results', rows, err, rows === 'undefined');

      if (err || typeof rows === 'undefined') {
        console.log("error:", err);
        done(null, false, {message: 'User not found'});
      } else {

        var user = rows;
        var salt = user.salt;
        var pass = user.password;
        var key = crypto.pbkdf2Sync(password, salt, 4096, 512, 'sha256');
        console.log("crypto  ", key.toString('base64'));
        console.log("password", user.password);

        if(user.password === key.toString('base64')) {
          console.log("hello:", key.toString('base64'), user.password);
          return done(null, user);
        } else {
          console.log("login fail:", password, user.password);
          return done(null, false, {message: 'yoo no pass!'});
        }
      }
    });

  }
));

app.use(function(req, res, next) {
  if(req.headers['x-forwarded-proto']!='https' && config.force_https === true) {
    var redirect = ['https://', req.get('Host'), req.url].join('');
    console.log("redirect to:", redirect);
    return res.redirect(redirect);
  }
  next();
});

app.use('/login', routes);
app.use('/', routes);
app.use('/payments', routes);
app.use('/lessons', routes);
app.use('/users', routes);
app.use('/api1/testthing', testthing);
app.use('/api1/transactions', transactions);
app.use('/api1/payments', payments);
app.use('/api1/users', users);
app.use('/api1/usersconfirm', usersconfirm);
app.use('/api1/login', login);
app.use('/api1/lessons', lessons);
//app.use('/api1', payments);
app.use('/installer', installer);

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
