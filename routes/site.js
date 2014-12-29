/**
 * Created by arno on 29/12/2014.
 */
var path = require('path');
exports.index = function(req,res){
    res.sendFile(path.resolve(__dirname + '/../views/index.html'));
};

exports.chat = function(req,res){
    res.sendFile(path.resolve(__dirname+ '/../views/chat.html'));
};