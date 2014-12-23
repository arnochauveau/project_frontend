/**
 * Created by arno on 23/12/2014.
 */


//Init stuff
var path = require('path');
var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

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
        io.sockets.emit('new message',{msg:data,nick:socket.nickname});
    });


});



//start listening
 http.listen(3000,function(){
    var host = "localhost";
    var port = "3000";

    console.log('Webserver listening at http://%s:%s',host,port);

});

