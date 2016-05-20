'use strict'
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');

router.route('/')
    .get(function (req, res) {
        if (!req.user) {
            res.redirect('/login');
        } else {
            res.render('index');
        }
    });

router.route('/register')
    .get(function (req, res) {
        if (req.user) {
            res.redirect('/');
        } else {
            res.render('register', {msg: req.flash()});
        }
    })
    .post(function (req, res, next) {
        User.register(
            new User({
                username: req.body.username
            }), 
            req.body.password,
            function (err, user) {
                if (err) {
                    return res.render('register', {msg: err.message});
                }
                
                passport.authenticate('local')(req, res, function () {
                    req.session.save(function (err){
                        if (err) {
                            return next(err);
                        }
                        res.redirect('/');
                    });
                });
            });
    });


router.route('/login')
    .get(function (req, res) {
        if (req.user) {
            res.redirect('/');
        } else {
            var error = req.flash().error || [];
            res.render('login', {msg: error});
        }
    })
    .post(passport.authenticate('local',{ successRedirect: '/', failureRedirect:'/login', failureFlash: true}));

router.route('/logout')
    .get(function (req, res) {
        req.logout();
        res.redirect('/login');
    });

module.exports = router;
