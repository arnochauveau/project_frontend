require('../data/connectDB');
var Brewery = require('../data/models/brewery');
var jsonfile = require('../public/testdata/testdata.json');

for (var i = 0; i < jsonfile.data.length; i++) {
    var newBrewery = new Brewery({
        name: jsonfile.data[i].brewery.name,
        website: jsonfile.data[i].brewery.website,
        streetAddress: jsonfile.data[i].streetAddress,
        locality: jsonfile.data[i].locality,
        established: jsonfile.data[i].brewery.established,
        latitude: jsonfile.data[i].latitude,
        longitude: jsonfile.data[i].longitude
    });
    newBrewery.save(function (err) {
        if (err)
            console.log('error on : ' + newBrewery + ' : ' + err);
    });
}
;

