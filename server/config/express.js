'use strict'
var port = process.env.PORT || 8080;
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var flash = require('connect-flash');
// Database
var config = require('./database');
var mongoose = require('mongoose');
var passport = require('./passport');

// Others
var compression = require('compression');
// End of Dependencies

// MemoryStore
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
//var MemoryStore = require('connect').express-session.MemoryStore;

module.exports = function(app, express) {
    console.log('express midlewares');
    app.set('port', port);
    
    // Use Server Views to render files
    app.engine('ejs',require('ejs-mate'));
    app.set('views', __dirname + './../views');
    app.set('view engine', 'ejs');
    app.use(express.static("public/"));
    app.use(flash());
    
    // Parse the Body from requests
    app.use(bodyParser.urlencoded({ extended: false })); 
    app.use(bodyParser.json());
    
    // Log to console
    app.use(morgan('dev'));
    
    // Setup cookie sessions
    app.use(cookieParser());
    
    // Connect to Database
    mongoose.connect(config.database, function onMongooseError(err) {
        if (err) throw err;
    });
    
    // Store sessions in mongo
    app.use(session({
        secret: config.secret,
        //key: 'express.sid',
        name: 'express.sid',
        cookie: { maxAge: 60 * 24 * 3600000 },
        store: new MongoStore({
            url: config.database,
            autoReconnect: true
        }),
        resave: false,
        saveUninitialized: false
    }));
    
    app.set('forceSSLOptions', {
        trustXFPHeader: true,
    });
    
    // Initialize passport middleware for user authentication
    app.use(passport.initialize());
    app.use(passport.session());
    
    // catch 404 and forward to error handler
    /*
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
    */
    // error handlers

// development error handler
    // will print stacktrace
    /*
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }
    */
    // production error handler
    // no stacktraces leaked to user
    /*
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
    */
    // Compress middleware
    app.use(compression());
    // End of Server Configuration
}


// Add CSRF token to requests to secure our ajax requests from the angular.js app
/*
  app.use(csrf());
  app.use(function(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  res.cookie('XSRF-TOKEN', req.csrfToken());
  next();
  });
*/










