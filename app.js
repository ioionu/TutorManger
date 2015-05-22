var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//passport stuff
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var bcrypt = require('bcrypt');
var db = require('./db.js');

//config is in config.js
var config = require('./config.js');

var routes = require('./routes/index');
var login = require('./routes/login');
var payments = require('./routes/payments');
var installer = require('./routes/installer');

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

//passport
var user = {
  _id: 123,
  username:"user san",
  password:"double rot 13 password"
};

app.use(session({secret: config.session.secret}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  done(null, user);
});

passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    req.res.query('select * from users where email = $1;', [username], function(err, rows, results){
      console.log('results', rows);
      if (err) {
        done(null, false, {message: 'User not found'});
      }
      if(rows[0].password != password) {
        return done(null, user, {message: 'Hello W0rld'});
      } else {
        return done(null, false, {message: 'yoo no pass!'});
      }
    });

  }
));


app.use('/login', login);
app.use('/', routes);
app.use('/payments', routes);
app.use('/users', routes);
app.use('/api1', payments);
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
