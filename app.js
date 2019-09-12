var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.use(session({
    secret: '!Q@W#E$R',
    resave: false,
    saveUninitialized: true
}));

app.get('/', function(req, res) {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    console.log("sess"+req.session.userName);
    if(req.session.userName) {
        res.redirect('/myfeed')
    }
    else
        res.render('main', { title: 'Main' });
  });
  
  app.get('/myfeed', function(req, res) {
    if(req.session.userName) {
      res.render('feedPage', { title: 'Feed'});
    }
    else {
      res.redirect('/');
    }
  });

  app.get('/login', function(req, res) {
    if(req.session.userName) {
        req.session.userName = req.body.mUserName;
    }
  });

  app.get('/sky0501', function(req, res) {
    if(req.session.userName) {
        res.render('profileStoryBoard', { title: 'ProfFeed'});
    }
    else {
        res.redirect('/');
    }
  });
  
  app.post('/', function(req, res) {
    console.log(""+req.body.mUserName);
    req.session.userName = req.body.mUserName;
    res.redirect('/myfeed');
  });
  
  app.get('/logout', function(req, res) {
    delete req.session.userName;
    res.redirect('/');
  });

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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
