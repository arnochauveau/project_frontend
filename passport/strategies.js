/**
 * Created by arno on 30/12/2014.
 */

var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../data/models/user');



passport.use(new localStrategy(
    function(username, password, done){
        User.findOne({username:username},function(err,user){
            if(err)
                return done(err);
            if(!user)
                return done(null,false,{message: 'Incorrect username'});
            if(!user.validPassword(password))
                return done(null,false,{message: 'Incorrect password'});

            return done(null,user);
        });
    }
));


passport.use(new FacebookStrategy({
        clientID: '765665256804176',
        clientSecret: '28ead6aca3eca4da165de5bc1ae3575d',
        callbackURL: "http:test.local.com:3000/login/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // To keep the example simple, the user's Facebook profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the Facebook account with a user record in your database,
            // and return that user instead.

            

            return done(null, profile);
        });
    }
));