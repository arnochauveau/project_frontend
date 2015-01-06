/**
 * Created by arno on 03/01/2015.
 */
function chatController($scope, socket, userdata) {
    $scope.usernames = [];
    $scope.messages = [];
    $scope.loggedIn = false;
    $scope.message = "";


    $scope.$on('socket:usernames', function (ev, data) {
        $scope.usernames = data;
    });


    $scope.$on('socket:new message', function (ev, data) {
        $scope.messages.push(data);
    });

    socket.on('load old msgs', function (data) {
        for (var i = 0; i < data.length; i++)
            $scope.messages.push(data[i]);
    });

    $scope.sendMessage = function () {

        socket.emit('send message', $scope.message);
        $scope.message = "";
    };

    userdata.then(onsucces, onerror);

    function onsucces(response) {

        if (response.data != 'false') {
            socket.emit('new user', response.data.username);
            $scope.loggedIn = true;
        }
    }

    function onerror(response) {
        console.log("error: " + response);
    }


}