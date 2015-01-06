/**
 * Created by arno on 28/12/2014.
 */

var mongoose = require('mongoose');
var chatSchema = require('../schemas/chat');

var Chat = mongoose.model('Message', chatSchema);


module.exports = Chat;