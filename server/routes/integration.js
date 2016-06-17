'use strict'
var express = require('express');
var router = express.Router();
var Integration = require('../models/integration');
var passport = require('passport');

router.route('/')
    .get(function (req, res) {
        if (!req.user) {
            res.redirect('/login');
        } else {
            Integration.find({userId: req.user.id}, function (err, integrations) {
                console.log(integrations);
                if (integrations) {
                    console.log('sending ' + integrations.length + ' integrations');
                    res.status(200).send(integrations);
                } else {
                    res.sendStatus(404);
                }
            });
        }
    })
    .post(function (req, res) {
        var integrationData = req.body;
        integrationData.userId = req.user.id;
        var integration = new Integration(integrationData);
        integration.save(function (err, integration) {
            console.log('integration: ' + integration);
            res.status(200).send(integration);
        });
    });

module.exports = router;
