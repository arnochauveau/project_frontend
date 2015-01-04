
var breweryController = function($scope,$http,uiGmapGoogleMapApi){

    $scope.breweryData = [];
    $scope.markers = [];

    $http.get('/brewerys').then(onsucces,onerror);

    function onsucces(response){
        $scope.breweryData = response.data;

    };

    function onerror(response){
        console.log("error: " + response);
    };

    uiGmapGoogleMapApi.then(function(maps) {
        $scope.map={center: {
            latitude: 50.85, longitude: 4.35},
            zoom: 8
            };

        $scope.options = {disableDefaultUI: true}

       // for(var i =0 ; i< $scope.breweryData.length;i++){
       //     var data = $scope.breweryData[i];
//
       //     var marker =
       //     {
       //         id : data._id,
       //         latitude: data.latitude,
       //         longitude: data.longitude
//
       //     };
       //     $scope.markers.push(marker);
//
       // }

    });
};

