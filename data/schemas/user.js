/**
 * Created by arno on 30/12/2014.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
    nick: String,
    password: String

});

userSchema.methods.validPassword = function(password){
    bcrypt.compare(password,this.password,function(err,res){
        if(err){
            console.log(err);
            return true;
        }
        if(res){
            return true;
        }
        else{
            return false;

        }
    })
};

module.exports = userSchema;