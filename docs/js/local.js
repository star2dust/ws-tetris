var Local = function(){
  // game object
  var game;
  // interval
  var INTERVAL = 500; // ms
  // timer
  var timer = null;
  // time count
  var timeCount = 0;
  // current time
  var time = 0;
  // bind keyboard event
  var bindKeyEvent = function(){
    document.onkeydown = function(e){
      switch (e.keyCode) {
        case 38: game.rotate(); break; // up
        case 39: game.right(); break; // right
        case 40: game.down(); break; // down
        case 37: game.left(); break; // left
        case 32: game.fall(); break; // space
        default: break;
      }
    }
  }
  // move
  var move = function(){
    timeFunc();
    if (!game.down()){
      game.fixed();
      var line = game.checkClear();
      if (line){
        game.addScore(line);
      }
      var gameOver = game.checkGameOver();
      if (gameOver){
        game.gameover(false);
        stop();
      }else {
        game.performNext(generateType(), generateDir());
      }
    }
  }
  // generate dirturbance line
  var generateBottomLine = function(lineNum) {
    var lines = [];
    for (var i=0; i<lineNum; i++){
      var line = [];
      for (var j=0; j<10; j++){
        line.push(Math.ceil(Math.random()*2)-1);
      }
      lines.push(line);
    }
    return lines;
  }
  // time function
  var timeFunc = function(){
    timeCount = timeCount + 1;
    if (timeCount == 1000/INTERVAL){
      timeCount = 0;
      time = time + 1;
      game.setTime(time);
      // if (time%10==0){
      //   game.addTailLines(generateBottomLine(1));
      // }
    }
  }
  // generate type
  var generateType = function(){
    return Math.ceil(Math.random()*7)-1;
  }
  // generate direction
  var generateDir = function(){
    return Math.ceil(Math.random()*4)-1;
  }
  // start
  var start = function(){
    var doms = {
      gameDiv: document.getElementById('local_game'),
      nextDiv: document.getElementById('local_next'),
      timeDiv: document.getElementById('local_time'),
      scoreDiv: document.getElementById('local_score'),
      resultDiv: document.getElementById('local_gameover')
    }
    game = new Game();
    game.init(doms, generateType(), generateDir());
    bindKeyEvent();
    game.performNext(generateType(), generateDir());
    timer = setInterval(move, INTERVAL);
  }
  // stop
  var stop = function(){
    if (timer){
      clearInterval(timer);
      timer = null;
    }
    document.onkeydown = null;
  }
  // api
  this.start = start;
}
