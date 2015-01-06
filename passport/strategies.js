/**
 * Created by arno on 30/12/2014.
 */

var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../data/models/user');


passport.use(new localStrategy(
    function (username, password, done) {
        User.findOne({username: username}, function (err, user) {
            if (err)
                return done(err);
            if (!user)
                return done(null, false, {message: 'Incorrect username'});
            if (!user.validPassword(password))
                return done(null, false, {message: 'Incorrect password'});

            return done(null, user);
        });
    }
));


passport.use(new FacebookStrategy({
        clientID: '765665256804176',
        clientSecret: '28ead6aca3eca4da165de5bc1ae3575d',
        callbackURL: "http://localhost/login/facebook/callback"
    },
    function (accessToken, refreshToken, profile, done) {
        // To keep the example simple, the user's Facebook profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Facebook account with a user record in your database,
        // and return that user instead.
        User.findOne({'accounts.uid': profile.id, 'accounts.provider': "facebook"}, function (err, oldUser) {
            if (oldUser) {
                done(null, oldUser)
            }
            else {
                var newUser = new User({username: profile.displayName});
                var accounts = {provider: 'facebook', uid: profile.id};
                newUser.accounts.push(accounts);
                newUser.save(function (err) {
                    if (err) console.log(err);
                    else
                        return done(null, newUser);
                });
            }

        });


    }
));