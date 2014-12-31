/**
 * Created by arno on 30/12/2014.
 */
require('../data/connectDB');
var User = require('../data/models/user');
var bcrypt = require('bcrypt');
var passport = require('passport');

exports.add= function(req,res){

    bcrypt.hash(req.query.password,null,null,function(err, hash){
        var newUser = new User({
            username: req.query.username,
            password: hash
        });
        newUser.save(function(err){
           if(err)
           res.send('error');

            res.send('user toegevoegd');
        });
    });


};

exports.login = function(req,res,next){
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err) }
        if (!user) {
            req.session.messages =  [info.message];
            //return res.redirect('/login')
            res.send(info.message);
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/');
        });
    })(req, res, next);
};

