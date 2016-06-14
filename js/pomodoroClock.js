var app = angular.module("pomodoroClock", ['ngMaterial']);

app.controller("pomodoroController", ['$scope', '$interval', function($scope, $interval){
  $scope.breakLength = 5;
  $scope.breakSeconds = $scope.breakLength * 60;
  $scope.activeLength = $scope.sessionLength = 25;
  $scope.sessionSeconds = $scope.sessionLength * 60;
  $scope.activeValue = "Session";
  $scope.pomodoro = new PomodoroClock($scope.breakLength, $scope.sessionLength);

  $scope.togglePomodoro = function(){
    if (angular.isDefined($scope.interval)) {
        $scope.stopPomodoro();
    } else {
        $scope.interval = $interval(function(){
          if ($scope.activeValue == "Session") {
              $scope.sessionSeconds -= 1;
              $scope.activeLength = $scope.pomodoro.formatSecondsToMinutes($scope.sessionSeconds);
              if ($scope.sessionSeconds == 0) {
                  $scope.activeLength = $scope.breakLength;
                  $scope.sessionSeconds = $scope.sessionLength * 60;
                  $scope.activeValue = "Break";
              }
          } else {
              $scope.breakSeconds -= 1;
              $scope.activeLength = $scope.pomodoro.formatSecondsToMinutes($scope.breakSeconds);
              if ($scope.breakSeconds == 0) {
                  $scope.activeLength = $scope.sessionLength;
                  $scope.breakSeconds = $scope.breakLength * 60;
                  $scope.activeValue = "Session";
              }
          }
        }, 1000);
    }
  }

  $scope.stopPomodoro = function(){
      $interval.cancel($scope.interval);
      $scope.interval = undefined;
  }

  $scope.reduceSessionLength = function(){
     if ($scope.sessionLength > 1) {
         $scope.sessionLength -= 1;
         $scope.sessionSeconds = $scope.sessionLength * 60;
         if ($scope.activeValue == "Session"){
             $scope.activeLength = $scope.sessionLength;
         }
         $scope.stopPomodoro();
     }
  }

  $scope.incrementSessionLength = function(){
     $scope.sessionLength += 1;
     $scope.sessionSeconds = $scope.sessionLength * 60;
     if ($scope.activeValue == "Session"){
         $scope.activeLength = $scope.sessionLength;
     }
     $scope.stopPomodoro();
  }

  $scope.reduceBreakLength = function(){
     if ($scope.breakLength > 1) {
         $scope.breakLength -= 1;
         $scope.breakSeconds = $scope.breakLength * 60;
         if ($scope.activeValue == "Break"){
             $scope.activeLength = $scope.breakLength;
         }
         $scope.stopPomodoro();
     }
  }

  $scope.incrementBreakLength = function(){
     $scope.breakLength += 1;
     $scope.breakSeconds = $scope.breakLength * 60;
     if ($scope.activeValue == "Break"){
         $scope.activeLength = $scope.breakLength;
     }
     $scope.stopPomodoro();
  }

}]);
