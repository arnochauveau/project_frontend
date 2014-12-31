/**
 * Created by arno on 30/12/2014.
 */
var User = require('../data/models/user');
var passport = require('passport');

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});