
var breweryController = function($scope,$http,uiGmapGoogleMapApi){

    $scope.breweryData = [];


    $http.get('/brewerys').then(onsucces,onerror);

    function onsucces(response){
        $scope.breweryData = response.data;

    }

    function onerror(response){
        console.log("error: " + response);
    }

    uiGmapGoogleMapApi.then(function(maps) {
        $scope.map={center: {
            latitude: 50.85, longitude: 4.35},
            zoom: 8
            };

        $scope.options = {disableDefaultUI: true}

        $scope.events = {
            click: function(marker, eventName, args){
                $scope.selectedmarker = marker.model;
            }
        }

        $scope.close = function(){
            $scope.selectedmarker = null;
        }
    });
};

