
var breweryController = function($scope,$http){
window.myscope=$scope;
    $scope.breweryData = [];

    $http.get('/brewerys').then(onsucces,onerror);

    function onsucces(response){
        $scope.breweryData = response.data;

    };

    function onerror(response){
        console.log("error: " + response);
    };
};