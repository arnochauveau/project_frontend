/**
 * Created by arno on 28/12/2014.
 */

require('../data/connectDB');
var Chat= require('../data/models/chat');

module.exports = {

    'Test1' : function(test){
        test.expect(1);
        test.ok(true, 'this shouldnt fail');
        test.done();
    }

};