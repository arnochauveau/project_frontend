var breweryController = function ($scope, $http, uiGmapGoogleMapApi) {

    $scope.breweryData = [];
    $scope.markers = [];
    $scope.year = '2015';
    $scope.filter = false;
    $scope.add = false;

    $http.get('/brewerys').then(onsucces, onerror);

    function onsucces(response) {
        $scope.breweryData = response.data;
        $scope.markers = $scope.breweryData;
    }

    function onerror(response) {
        console.log("error: " + response);
    }

    uiGmapGoogleMapApi.then(function (maps) {
        $scope.map = {
            center: {
                latitude: 50.85, longitude: 4.35
            },
            zoom: 8
        };

        $scope.options = {disableDefaultUI: true}

        $scope.events = {
            click: function (marker, eventName, args) {
                $scope.selectedmarker = marker.model;
            }
        };

        $scope.close = function () {
            $scope.selectedmarker = null;
        };

        $scope.yearChanged = function () {
            $scope.markers = [];

            for (var i = 0; i < $scope.breweryData.length; i++) {
                if ($scope.breweryData[i].established <= $scope.year) {
                    $scope.markers.push($scope.breweryData[i]);
                }
            }
        };

        $scope.filterClicked = function () {

            $scope.add = false;

            $scope.filter = !$scope.filter;


        };

        $scope.addClicked = function () {
            $scope.filter = false;
            $scope.add = !$scope.add;
        };
    });
};

