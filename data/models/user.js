/**
 * Created by arno on 30/12/2014.
 */
var mongoose = require('mongoose');
var userSchema = require('../schemas/user');

var User = mongoose.model('User', userSchema);


module.exports = User;