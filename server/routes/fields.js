'use strict'
var express = require('express');
var router = express.Router();
var Fields = require('../models/projectFields');
var mongoose = require('mongoose');

router.route('/')
    .get(function (req, res) {
        if (!req.user) {
            res.redirect('/login');
        } else {
            console.log(req.user.id);
            Fields.findOne({userId: req.user.id}, function (err, fields) {
                if (fields) {
                    res.status(200).send(fields.fields);        
                } else {
                    var projectFields = new Fields({userId: req.user.id});
                    projectFields.save().then(function (data) {
                        res.status(200).send(data.fields);
                    });
                    
                }
            });
        } 
    })
    .post(function (req, res) {
    });

router.route('/:id')
    .put(function (req, res) {
        
    }).delete(function (req, res) {
        var userId = req.user.id;
        var fieldId = req.params.id;
        Fields.update({userId: userId}, {$pull: {fields: {_id: fieldId}}}, function (err, data) {
            console.log(err);
            console.log(data);
        }); 
        res.sendStatus(200);
    });

module.exports = router;
