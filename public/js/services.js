/**
 * Created by arno on 03/01/2015.
 */
App.factory('socket', function (socketFactory) {
    var mysocket = socketFactory();
    mysocket.forward('usernames');
    mysocket.forward('new message');


    return mysocket;
});


App.factory('userdata',['$http',function($http){
    return $http.get('/user');
}]);