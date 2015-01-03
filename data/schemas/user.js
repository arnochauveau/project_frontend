/**
 * Created by arno on 30/12/2014.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    accounts:[]

});

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.password);
};

module.exports = userSchema;