/**
 * Created by arno on 30/12/2014.
 */
require('../data/connectDB');
var User = require('../data/models/user');
var bcrypt = require('bcrypt');

exports.add= function(req,res){

    bcrypt.hash(req.query.password,null,null,function(err, hash){
        var newUser = new User({
            nick: req.query.nick,
            password: hash
        });
        newUser.save(function(err){
           if(err)
           res.send('error');

            res.send('user toegevoegd');
        });
    });


};

