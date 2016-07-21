'use strict'
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');
var config = 
    { mail: require('../config/mail') }

router.route('/')
    .get(function (req, res) {
        if (!req.user) {
            res.redirect('/login');
        } else {
            res.render('index');
        }
    });

router.route('/account')
    .get(function (req, res) {
        res.status(200).send(req.user);
    })
router.route('/account/:id')
    .put(function (req, res) {
        var userData = req.body;
        var query = {_id: req.user._id};
        var update = userData;
        var options = {upsert: false, multi: false};
        User.update(query, update, options, function (err, result) {
            res.status(200).send(userData);
        });
    });

router.route('/forgot')
    .get(function (req, res) {
        res.render('forgotPassword', {msg: req.flash()});
    }).post(function (req, res) {
        async.waterfall([
            function (done) {
                crypto.randomBytes(20, function(err, buf) {
                    var token = buf.toString('hex');
                    done(err, token);
                });
            },
            function(token, done) {
                User.findOne({ username: req.body.username }, function(err, user) {
                    if (!user) {
                        req.flash('error', 'No account with that email address exists.');
                        return res.redirect('/forgot');
                    }
                    
                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
                    user.save(function(err) {
                        done(err, token, user);
                    });
                });
            },
            function (token, user, done) {
                var hostname = req.headers.host;
                var resetPasswordUrl = 'http://' + hostname + '/resetpassword/';
                var email = req.body.username;
                var smtpTransport = nodemailer.createTransport(config.mail);
                resetPasswordUrl += token;
                smtpTransport.sendMail({
                    from: 'Plann <luis.correia@plann.pt>',
                    to: user.username,
                    bcc: 'info@plann.pt',
                    replyTo: 'luis.correia@plann.pt',
                    subject: 'Plann Password Request',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        resetPasswordUrl + '\n\n' +
                        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                }, function forgotPasswordResult(err) {
                    req.flash('info', 'An e-mail has been sent to ' + user.username + ' with further instructions.');
                    done(err, 'done');
                });
            }
        ], function (err) {
            if (err) return next(err);
            res.redirect('/forgot');
        });
    });

router.route('/resetpassword/:token') 
    .get(function (req, res) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
            if (!user) {
                req.flash('error', 'Password reset token is invalid or has expired.');
                return res.redirect('/forgot');
            }
            res.render('resetPassword', {accountId: user._id});
        });        
    })
    .post(function (req, res) {
        var password = req.body.password;
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
            if (!user) {
                req.flash('error', 'Password reset token is invalid or has expired.');
                return res.redirect('back');
            }
            
            user.setPassword(password, function (err, doc) {
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;
                doc.save();
                req.logIn(user ,function (err) {
                    res.redirect('/');
                });
            });
        });
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
