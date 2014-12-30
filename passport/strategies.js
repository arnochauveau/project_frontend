/**
 * Created by arno on 30/12/2014.
 */

var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../data/models/users');


passport.use(new localStrategy(
    function(username, password, done){
        User.findOne({nick:username},function(err,user){
            if(err)
                return done(err);
            if(!user)
                return done(null,false,{message: 'Incorrect username'});
            if(!user.validPassword(password))
                return done(null,false,{message: 'incorrect password'});

            return done(null,user);
        });
    }
));