/**
 * Created by arno on 03/01/2015.
 */
function chatController($scope,socket){
    $scope.usernames =[];
    $scope.messages = [];

    socket.on('usernames',function(data){
        $scope.usernames.push(data);
    });

    socket.on('new message',function(data){
        $scope.messages.push(data);
    });

    socket.on('load old msgs',function(data){
        $scope.messages.push(data);
    });

    $scope.sendMessage = function(){
      socket.emit('send message',$scope.message);
    };
    //TODO get user scope and emit new user event


}