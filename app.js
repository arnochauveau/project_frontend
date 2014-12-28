/**
 * Created by arno on 23/12/2014.
 */


//Init stuff
var path = require('path');
var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var mongoose = require('mongoose');


var nicknames = [];

//ROUTING
app.use(express.static(path.join(__dirname, 'public')));
app.get('/',function(req,res){
    res.sendFile(path.resolve(__dirname + '/pages/index.html'));
});
app.get('/chat',function(req,res){
    res.sendFile(path.resolve(__dirname+ '/pages/chat.html'));
});

//socket stuff
io.sockets.on("connection", function (socket) {

    ChatModel.find({}).sort('-created').limit(8).exec(function(err,docs){
        if(err) console.log(err);
        socket.emit('load old msgs',docs);
    });

    // here are connections from /new
    socket.on('new user',function(data,callback){
        console.log("new user");
        if(nicknames.indexOf(data) != -1){

            callback(false);

        }
        else{
            callback(true);
            socket.nickname = data;
            nicknames.push(socket.nickname);
            io.sockets.emit('usernames',nicknames);

        }
    });
    socket.on('disconnect',function(data){
        if(!socket.nickname){
            return;
        }

        nicknames.splice(nicknames.indexOf(socket.nickname),1);
        io.sockets.emit('usernames',nicknames);
    });

    socket.on('send message',function(data){
        var newMsg = new ChatModel({msg: data,nick: socket.nickname});
        newMsg.save(function(err){
           if(err) console.log(err);

            io.sockets.emit('new message',{msg:data,nick:socket.nickname});

        });
    });


});



//start listening
 http.listen(3000,function(){
    var host = "localhost";
    var port = "3000";

    console.log('Webserver listening at http://%s:%s',host,port);

});

mongoose.connect('mongodb://localhost/chat',function(err){
   if(err){
       console.log(err);
   }
});

var chatSchema = mongoose.Schema({
    nick: String,
    msg: String,
    created: {type:Date, default: Date.now()}
});

var ChatModel = mongoose.model('Message',chatSchema);

