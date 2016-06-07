function PomodoroClock(breakLength, sessionLength){
  this.breakLength = breakLength;
  this.sessionLength = sessionLength;
  this.pomodoroRunning = false;
}

PomodoroClock.prototype = {
  startPomodoro: function(){

  },

  formatSecondsToMinutes: function(seconds){
    if (seconds % 60 != 0){
      var numMinutes = Math.floor(seconds / 60),
          numSeconds = seconds % 60;
          numSeconds = numSeconds < 10 ? "0" + numSeconds : numSeconds;
          formattedSeconds = numMinutes + " : " + numSeconds;

      return formattedSeconds;
    }
    return seconds;
  }
};
