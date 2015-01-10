/**
 * Created by arno on 30/12/2014.
 */
require('../data/connectDB');
var User = require('../data/models/user');
var bcrypt = require('bcrypt');
var passport = require('passport');

exports.add = function (req, res) {

    bcrypt.hash(req.body.password, null, null, function (err, hash) {
        var newUser = new User({
            username: req.body.username,
            password: hash
        });
        newUser.save(function (err) {
            if (err)
                res.send('error');

            res.redirect(307, '/login');
        });
    });


};

exports.login = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err)
        }
        if (!user) {
            req.session.messages = [info.message];
            return res.redirect('/login')

        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });
    })(req, res, next);
};

exports.CurrentUser = function (req, res) {
    if (req.user)
        res.send(req.user);
    else
        res.send(false);
};

exports.fbcb = function (req, res, next) {
    passport.authenticate('facebook', {successRedirect: '/', failureRedirect: '/login'})(req, res, next);
};

exports.fb = function (req, res, next) {
    passport.authenticate('facebook')(req, res, next);
};

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

