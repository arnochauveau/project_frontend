/**
 * Created by arno on 29/12/2014.
 */

var mongoose = require('mongoose');

var brewerySchema = mongoose.Schema({
    name: String,
    website: String,
    streetAddress: String,
    locality: String,
    established: String,
    latitude: Number,
    longitude: Number
});

module.exports = brewerySchema;