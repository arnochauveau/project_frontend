/**
 * Created by arno on 30/12/2014.
 */
var path = require('path');
var express = require('express');
var session = require('express-session');
var passport = require('passport');

var config = function(app){

        app.use(express.static(path.join(__dirname, '/../public')));
        app.use(session({secret:'NMCT IS LEUK'}));
        app.use(passport.initialize());
        app.use(passport.session());
};

module.exports = config;