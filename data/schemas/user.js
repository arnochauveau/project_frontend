/**
 * Created by arno on 30/12/2014.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    nick: String,
    password: String

});

userSchema.methods.validPassword = function(password){

}

module.exports = userSchema;