/**
 * Created by arno on 23/12/2014.
 */


//Init stuff


var app = require('./routes');
var http = require('http').Server(app);
var io = require('socket.io')(http);
io = require('./socket.io/sockets')(io);
require('./data/connectDB');




//ROUTING


//socket stuff



//start listening
http.listen(80, function () {
    var host = "localhost";
    var port = "80";

    console.log('Webserver listening at http://%s:%s', host, port);

});







