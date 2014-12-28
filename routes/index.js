/**
 * Created by arno on 28/12/2014.
 */
var express =  require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, '/../public')));
app.get('/',function(req,res){
    res.sendFile(path.resolve(__dirname + '/../views/index.html'));
});
app.get('/chat',function(req,res){
    res.sendFile(path.resolve(__dirname+ '/../views/chat.html'));
});

module.exports= app;