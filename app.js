/**
 * Created by arno on 23/12/2014.
 */


//Init stuff


var app = require('./routes');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Chat= require('./data/models/chat');
require('./data/connectDB');



var nicknames = [];

//ROUTING


//socket stuff
io.sockets.on("connection", function (socket) {

    Chat.find({}).sort('-created').limit(8).exec(function(err,docs){
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
        var newMsg = new Chat({msg: data,nick: socket.nickname});
        newMsg.save(function(err){
           if(err) console.log(err);

            io.sockets.emit('new message',{msg:data,nick:socket.nickname});

        });
    });


});



//start listening
 http.listen(80,function(){
    var host = "localhost";
    var port = "80";

    console.log('Webserver listening at http://%s:%s',host,port);

});







