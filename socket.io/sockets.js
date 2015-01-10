/**
 * Created by arno on 10/01/2015.
 */
var Chat = require('../data/models/chat');
module.exports =function(io) {
    var nicknames = [];
    io.sockets.on("connection", function (socket) {

        Chat.find({}).sort('-created').limit(8).exec(function (err, docs) {
            if (err) console.log(err);
            socket.emit('load old msgs', docs);
        });

        // here are connections from /new
        socket.on('new user', function (data) {
            console.log("new user");


            socket.nickname = data;
            nicknames.push(socket.nickname);
            io.sockets.emit('usernames', nicknames);


        });
        socket.on('disconnect', function (data) {
            if (!socket.nickname) {
                return;
            }

            nicknames.splice(nicknames.indexOf(socket.nickname), 1);
            io.sockets.emit('usernames', nicknames);
        });

        socket.on('send message', function (data) {
            var newMsg = new Chat({msg: data, nick: socket.nickname});
            newMsg.save(function (err) {
                if (err) console.log(err);

                io.sockets.emit('new message', {msg: data, nick: socket.nickname});

            });
        });


    });
};