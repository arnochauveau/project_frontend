
var breweryController = function($scope,$http){

    $scope.breweryData = [];

    $http.get('./testdata/testdata.json').then(onsucces,onerror);

    function onsucces(response){
        $scope.breweryData = response.data.data;

    };

    function onerror(response){
        console.log("error: " + response);
    };
}