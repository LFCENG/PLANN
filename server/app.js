'use strict'
// Load express module
var express = require('express');
var app = express();

// Configure express and middleware
require('./config/express')(app, express);

// Set Routes
var userRoutes = require('./routes/user');
app.use('/', userRoutes);

// Create Server
module.exports = app;
