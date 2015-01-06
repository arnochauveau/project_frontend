/**
 * Created by arno on 28/12/2014.
 */

var mongoose = require('mongoose');

var chatSchema = mongoose.Schema({
    nick: String,
    msg: String,
    created: {type: Date, default: Date.now()}
});

module.exports = chatSchema;