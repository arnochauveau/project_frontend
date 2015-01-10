exports.userTests = {
    setUp: function(callback){
        this.User = require('../routes/user');
        require('../data/connectDB');
        this.usermodel = require('../data/models/user');

        callback();
    },
    tearDown: function(callback){
        this.usermodel.findOne({username:'testuser'}).remove().exec();
        callback();
    }
    ,
    testAddUser: function(test){

        test.expect(3);
        //mock the req obj from express
        var req ={};
        req.body = {};
        req.body.password = 'password';
        req.body.username = 'testuser';

        //mock the res object from express
        var res ={};
        res.redirect = function(port, url){
            require('../data/connectDB');
            this.usermodel = require('../data/models/user');
            this.usermodel.findOne({username: 'testuser'}, function (err, user) {


                test.ok(!err,"err object should be null");
                test.ok(user,"user object should not be null");
                test.ok(user.validPassword('password'), 'the password hash in DB should be the same as the hash of  password');
                test.done();

            });
        };

        //execute the add function
        this.User.add(req,res);

    }



};

exports.brewerytests = {
    setUp: function(callback){
        this.brewery = require('../routes/brewery');
        require('../data/connectDB');
        this.brewerymodel = require('../data/models/brewery');
        callback();
    },
    tearDown: function(callback){
        this.brewerymodel.findOne({name: 'testnaam'}).remove().exec();
        callback();
    },
    Testlist: function(test){
        test.expect(1);

        var res ={};
        res.send = function(docs){
            test.ok(docs, "the list should be thruthy");
            test.done();
        };

        var req = {};

        this.brewery.list(req,res)
    },
    TestAdd: function(test){
        test.expect(8);

        var req ={};
        req.query={};
        req.query.name= 'testnaam';
        req.query.website ='testsite';
        req.query.streetAddress= 'teststraat';
        req.query.locality= 'testgemeente';
        req.query.established="0000";
        req.query.latitude = 0;
        req.query.longitude = 0;

        var res = {};
        res.redirect = function(url){
            require('../data/connectDB');
            this.brewerymodel = require('../data/models/brewery');

            this.brewerymodel.findOne({name: 'testnaam'},function(err,brewery){
                test.ok(!err,"err object should be falsy");
                test.ok(brewery,"brewery object should be thruthy");

                test.equal(brewery.website,'testsite',"website should be testsite");
                test.equal(brewery.streetAddress,'teststraat',"streetaddress should be teststraat");
                test.equal(brewery.locality,'testgemeente',"locality should be testgemeente");
                test.equal(brewery.established,'0000',"established should be 0000");
                test.equal(brewery.latitude,0.00,"lat should be 0.00");
                test.equal(brewery.longitude,0.00,"long should be 0.00");

                test.done();
            });
        };

        this.brewery.add(req,res);

    }
};