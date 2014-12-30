/**
 * Created by arno on 30/12/2014.
 */
var User = require('../data/models/user');
var passport = require('passport');

passport.serializeUser(function(user,done){
    done(null, user.id);
});

passport.deserializeUser(function(id,done){
   User.findById(id,function(err,user){
       done(err,user);
   });
});