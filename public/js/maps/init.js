/**
 * Created by arno on 29/12/2014.
 */
(function() {
    var mapOptions = {
        center: { lat: 50.85, lng: 4.35},
        zoom: 8,
        disableDefaultUI: true,
        draggable: true,
        scrollwheel: true,
        mapTypeId: google.maps.MapTypeId.ROADS
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);


   setTimeout(function(){

      var brewerydata = window.myscope.breweryData;
       console.log(window.myscope.breweryData[1]);
       for(var i = 0; i< brewerydata.length;i++){
           var marker = new google.maps.Marker({
               position: new google.maps.LatLng(brewerydata[i].latitude,brewerydata[i].longitude),
               map:map,
               title: brewerydata[i].name
           });
           console.log(marker);
       }

   },500);



})();