'use strict'
var express = require('express');
var router = express.Router();
var Project = require('../models/project');
var mongoose = require('mongoose');
var Integration = require('../models/integration');
var passport = require('passport');
var TogglClient = require('toggl-api');
var InvoiceXpressClient = require('invoicexpress');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/'});
var csv = require("fast-csv");
var fs = require('fs');
var utf8 = require('to-utf-8');

var uploadProjectsFromCsvStream = function (file, userId) {
    var stream = fs.createReadStream(file.path);
    var csvStream = csv.parse({headers: true, ignoreEmpty: true })
    //.validate(function (data, next) {
    // })
    // .on('data-invalid', function (data) {
    // })
        .on('data', function (data) {
            var projectData = data;
            projectData.userId = userId;
            console.log(projectData);
            var project = new Project(projectData);
            project.save();
        })
        .on('end', function () {
            console.log('done');
        });
    stream.pipe(utf8()).pipe(csvStream);
};

router.route('/')
    .get(function (req, res) {
        if (!req.user) {
            res.redirect('/login');
        } else {
            Project.find({userId: req.user.id}, function (err, projects) {
                if (projects) {
                    console.log('sending ' + projects.length + ' projects');
                    res.status(200).send(projects);        
                } else {
                    res.sendStatus(404);
                }
            });
        } 
    })
    .post(function (req, res) {
        var projectData = {};
        var fields = req.body.fields;
        projectData.userId = req.user.id;
        projectData.fields = fields;
        console.log('projectData: ');
        console.log(projectData);
        var project = new Project(projectData);
        project.save(function (err, project) {
            console.log('project: ' + project);
            res.status(200).send(project);
        });
    });

router.route('/:id')
    .put(function (req, res) {
        var projectId = mongoose.Types.ObjectId(req.params.id);
        var projectData = req.body;
        var query = {_id: projectId};
        var update = projectData;
        var options = {upsert: false, multi: false};
        Project.update(query, update, options, function (err, result) {
            res.status(200).send(projectData);
        });
    }).delete(function (req, res) {
        var projectId = mongoose.Types.ObjectId(req.params.id);
        Project.findById(projectId, function (err, project) {
            if (err) {
                res.status(200).send(err);
            } else {
                project.remove()
                res.sendStatus(200);
            }
        });
    });

router.route('/integrations/:integration')
    .get(function (req, res) {
        var integrationName = req.params.integration;
        Integration.findOne({userId: req.user.id, integration: integrationName}, function (err ,integration) {
            if (integration) {
                if (integrationName == 'toggl') {
                    var toggl = new TogglClient({apiToken: integration.token});
                    toggl.getUserData({'with_related_data': true} ,function (err, data) {
                        
                        res.status(200).send(data);        
                    });
                } else if (integrationName == "invoicexpress") {
                    var invoicexpress = new InvoiceXpressClient(integration.token);
                    invoicexpress.getInvoice({per_page: 30}, function (err, data) {
                        res.status(200).send(data);
                    });
                }
            } else {
                res.sendStatus(404);
            }
        });
    });

router.route('/fileupload')
    .post(upload.single('file'), function (req, res) {
        var userId = req.user.id;
        var file = req.file;
        console.log('UserId: ' + userId);
        console.log('file: ');
        console.log(file);
        uploadProjectsFromCsvStream(file, userId);
        res.sendStatus(200);
    });

module.exports = router;
