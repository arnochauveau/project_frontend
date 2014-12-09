/**
 * Created by arno on 09/12/2014.
 */
//http://api.brewerydb.com/v2/locations?key=6eb1ec7a5fb373f5ba3fbf91585c3760&CountryIsoCode=be&region=oost-vlaanderen
$.ajax({
    url: "./testdata/testdata.json",
    dataType: 'json',
    success: function (data) {

        var obj = data.data;
        console.log(obj);

    },
    error: function(err){
        console.log(err);
    }
});