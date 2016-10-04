'use strict'
// Load express module
var express = require('express');
var app = express();

// Configure express and middleware
require('./config/express')(app, express);

// Set Routes
var userRoutes = require('./routes/user');
var projectRoutes = require('./routes/project');
var fieldsRoutes = require('./routes/fields');
var integrationRoutes = require('./routes/integration');
app.use('/', userRoutes);
app.use('/fields/', fieldsRoutes);
app.use('/project/', projectRoutes);
app.use('/integration/', integrationRoutes);

// Create Server
module.exports = app;
