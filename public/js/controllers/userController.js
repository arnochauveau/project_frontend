/**
 * Created by arno on 03/01/2015.
 */
var userController = function($scope,$http){



    $http.get('/user').then(onsucces,onerror);

    function onsucces(response){

        $scope.user = null;
        if(response.data != 'false')
        $scope.user = response.data;


    };

    function onerror(response){
        console.log("error: " + response);
    };
};