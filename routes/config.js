/**
 * Created by arno on 30/12/2014.
 */
var path = require('path');
var express = require('express');
var session = require('express-session');
var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');



var config = function(app){

        app.use(express.static(path.join(__dirname, '/../public')));
        app.use(cookieParser()); // read cookies (needed for auth)
        app.use(bodyParser.json()); // get information from html forms
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(session({secret:'NMCT IS LEUK',saveUninitialized: true, resave: true}));
        app.use(passport.initialize());
        app.use(passport.session());

};

module.exports = config;