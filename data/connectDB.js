/**
 * Created by arno on 28/12/2014.
 */
//'mongodb://localhost/chat'

var mongoose = require('mongoose');

module.exports = (function () {

    var mongodbURL = 'mongodb://localhost/bier';
    var db = mongoose.connect(mongodbURL);

    mongoose.connection.on('error', function (err) {
        console.log('error bij mongo conn: ' + err);
    });

    mongoose.connection.on('open', function () {
        console.log('connectie met : ' + mongodbURL);
    });

    return {db: db};


})();

