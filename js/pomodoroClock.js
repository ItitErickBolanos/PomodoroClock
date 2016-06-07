var app = angular.module("pomodoroClock", ['ngMaterial']);

app.controller("pomodoroController", ['$scope', '$interval', function($scope, $interval){
  $scope.breakLength = 5;
  $scope.breakSeconds = 5 * 60;
  $scope.sessionSeconds = 25 * 60;
  $scope.activeLength = $scope.sessionLength = 25;
  $scope.activeValue = "Session";
  $scope.pomodoro = new PomodoroClock($scope.breakLength, $scope.sessionLength);

  $scope.startActiveValue = function(){
    $scope.interval = $interval(function(){
      $scope.sessionSeconds -= 1;
      $scope.activeLength = $scope.pomodoro.formatSecondsToMinutes($scope.sessionSeconds);
    }, 1000);
  }

}]);
