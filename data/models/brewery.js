/**
 * Created by arno on 29/12/2014.
 */

var mongoose = require('mongoose');
var brewerySchema = require('../schemas/brewery');

var Brewery = mongoose.model('Brewery',brewerySchema);

module.exports = Brewery;