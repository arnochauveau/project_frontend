/**
 * Created by arno on 29/12/2014.
 */

var con = require('../data/connectDB');
var Brewery= require('../data/models/brewery');

exports.list = function(req,res){
    Brewery.find({}).sort('established').exec(function(err,docs){
        if(err) console.log(err);
        res.send(docs);

    });
};
// TESTQUERY: http://localhost:3000/brewery/add?name=brouwerij%20achouffe&website=http:\/\/www.achouffe.be&streetAddress=Achouffe%2032&locality=Achoufe&established=1982&latitude=50.147778&longitude=5.754207
exports.add = function(req,res){
    var newBrewery = new Brewery({
        name: req.query.name,
        website: req.query.website,
        streetAddress: req.query.streetAddress,
        locality: req.query.locality,
        established: req.query.established,
        latitude: req.query.latitude,
        longitude:req.query.longitude
    });
    newBrewery.save(function(err){
        if(err)
        console.log(err);

        res.redirect('/')
    });
};