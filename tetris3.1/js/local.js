var Local = function(socket){
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
        case 38: game.rotate(); socket.emit('rotate'); break; // up
        case 39: game.right(); socket.emit('right'); break; // right
        case 40: game.down(); socket.emit('down'); break; // down
        case 37: game.left(); socket.emit('left'); break; // left
        case 32: game.fall(); socket.emit('fall'); break; // space
        default: break;
      }
    }
  }
  // bind button events
  var bindBtnEvent = function(){
    document.getElementById('down').onclick = function(){
      game.down();
    }
    document.getElementById('left').onclick = function(){
      game.left();
    }
    document.getElementById('right').onclick = function(){
      game.right();
    }
    document.getElementById('rotate').onclick = function(){
      game.rotate();
    }
    document.getElementById('fall').onclick = function(){
      game.fall();
    }
  }
  // move
  var move = function(){
    timeFunc();
    if (!game.down()){
      game.fixed();
      socket.emit('fixed');
      var line = game.checkClear();
      if (line){
        game.addScore(line);
        socket.emit('line',line);
        if (line>1){
          var bottomLine = generateBottomLine(line);
          socket.emit('bottomLine',bottomLine);
        }
      }
      var gameOver = game.checkGameOver();
      if (gameOver){
        game.gameover(false);
        document.getElementById('remote_gameover').innerHTML = 'You win.';
        socket.emit('lose');
        stop();
      }else {
        var typeNext = generateType();
        var dirNext = generateDir();
        game.performNext(typeNext, dirNext);
        socket.emit('next',{type:typeNext, dir:dirNext});
      }
    }else {
      socket.emit('down');
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
      socket.emit('time',time);
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
    var type = generateType();
    var dir = generateDir();
    game.init(doms, type, dir);
    socket.emit('init',{type:type, dir:dir});
    bindKeyEvent();
	bindBtnEvent();
    var typeNext = generateType();
    var dirNext = generateDir();
    game.performNext(typeNext, dirNext);
    socket.emit('next',{type:typeNext, dir:dirNext});
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
  socket.on('start',function(){
    document.getElementById('waiting').innerHTML = '';
    start();
  });

  socket.on('lose',function(){
    game.gameover(true);
    stop();
  });

  socket.on('leave',function(){
    document.getElementById('local_gameover').innerHTML = 'Disconnect.';
    document.getElementById('remote_gameover').innerHTML = 'Disconnect.';
    stop();
  });

  socket.on('bottomLine',function(data){
    game.addTailLines(data);
    sockte.emit('addTailLines',data);
  })
}
