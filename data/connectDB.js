/**
 * Created by arno on 28/12/2014.
 */
//'mongodb://localhost/chat'

var mongoose = require('mongoose');

module.exports = (function () {

    var mongodbURL = 'mongodb://bierenapp:bierenapp@ds056727.mongolab.com:56727/bieren';
    var db = mongoose.connect(mongodbURL);

    mongoose.connection.on('error', function (err) {
        console.log('error bij mongo conn: ' + err);
    });

    mongoose.connection.on('open', function () {
        console.log('connectie met : ' + mongodbURL);
    });

    return {db: db};


})();

