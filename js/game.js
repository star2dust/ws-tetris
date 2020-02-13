var Game = function(){
  // dom elements
  var gameDiv;
  var nextDiv;
  var timeDiv;
  var scoreDiv;
  var resultDiv;
  // score
  var score = 0;
  // game matrix
  var nextData = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
  ];
  var gameData = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
  ];
  // current square
  var cur;
  // next square
  var next;
  // divs
  var nextDivs = [];
  var gameDivs = [];
  // initialize div
  var initDiv = function(container, data, divs){
    for (var i=0;i<data.length;i++){
      var div = [];
      for (var j=0;j<data[0].length;j++){
        var newNode = document.createElement('div');
        newNode.className='none';
        newNode.style.top=(i*20)+'px';
        newNode.style.left=(j*20)+'px';
        container.appendChild(newNode);
        div.push(newNode);
      }
      divs.push(div);
    }
  }
  // refresh div
  var refreshDiv = function(data, divs){
    for (var i=0;i<data.length;i++){
      for (var j=0;j<data[0].length;j++){
        if (data[i][j]==0){
          divs[i][j].className='none';
        }else if (data[i][j]==1) {
          divs[i][j].className='done';
        }else if (data[i][j]==2) {
          divs[i][j].className='current';
        }
      }
    }
  }
  // check coordinate validity
  var check = function(pos, x, y){
    if (pos.x+x<0){
      return false;
    }else if (pos.x+x>=gameData.length){
      return false;
    }else if (pos.y+y<0) {
      return false;
    }else if (pos.y+y>=gameData[0].length) {
      return false;
    }else if (gameData[pos.x+x][pos.y+y]==1){
      return false;
    }else {
      return true;
    }
  }
  // check data validity
  var isValid = function(pos, data){
    for (var i=0;i<data.length;i++){
      for (var j=0;j<data[0].length;j++){
        if (data[i][j]!=0){
          if (!check(pos,i,j)){
            return false;
          }
        }
      }
    }
    return true;
  }
  // clear data
  var clearData = function(){
    for (var i=0;i<cur.data.length;i++){
      for (var j=0;j<cur.data[0].length;j++){
        if (check(cur.origin,i,j)){
          gameData[cur.origin.x+i][cur.origin.y+j] = 0;
        }
      }
    }
  }
  // set data
  var setData = function(){
    for (var i=0;i<cur.data.length;i++){
      for (var j=0;j<cur.data[0].length;j++){
        if (check(cur.origin,i,j)){
          gameData[cur.origin.x+i][cur.origin.y+j] = cur.data[i][j];
        }
      }
    }
  }
  // down
  var down = function(){
    if (cur.canDown(isValid)){
      clearData();
      cur.down();
      setData();
      refreshDiv(gameData,gameDivs);
      return true;
    }else {
      return false;
    }
  }
  // left
  var left = function(){
    if (cur.canLeft(isValid)){
      clearData();
      cur.left();
      setData();
      refreshDiv(gameData,gameDivs);
    }
  }
  // right
  var right = function(){
    if (cur.canRight(isValid)){
      clearData();
      cur.right();
      setData();
      refreshDiv(gameData,gameDivs);
    }
  }
  // rotate
  var rotate = function(){
    if (cur.canRotate(isValid)){
      clearData();
      cur.rotate();
      setData();
      refreshDiv(gameData,gameDivs);
    }
  }
  // fixed
  var fixed = function(){
    for (var i=0;i<cur.data.length;i++){
      for (var j=0;j<cur.data[0].length;j++){
        if (check(cur.origin,i,j)){
          if (gameData[cur.origin.x+i][cur.origin.y+j] == 2){
            gameData[cur.origin.x+i][cur.origin.y+j] = 1;
          }
        }
      }
    }
    refreshDiv(gameData, gameDivs);
  }
  // check clear
  var checkClear = function(){
    var line = 0;
    for (var i=gameData.length-1; i>=0; i--){
      var clear = true;
      for (var j=0; j<gameData[0].length; j++){
        if (gameData[i][j]!=1){
          clear = false;
          break;
        }
      }
      if (clear){
        line = line + 1;
        for (var m=i; m>0; m--){
          for (var n=0; n<gameData[0].length; n++){
            gameData[m][n] = gameData[m-1][n];
          }
        }
        for (var n=0; n<gameData[0].length; n++){
          gameData[0][n] = 0;
        }
        i = i+1;
      }
    }
    return line;
  }
  // check game over
  var checkGameOver = function(){
    var gameOver = false;
    for (var i=0; i<gameData[0].length; i++){
      if (gameData[0][i]==1){
        gameOver = true;
      }
    }
    return gameOver;
  }
  // perform next square
  var performNext = function(type, dir){
    cur = next;
    setData();
    next = squareFactory.prototype.make(type, dir);
    refreshDiv(gameData, gameDivs);
    refreshDiv(next.data, nextDivs);
  }
  // set time
  var setTime = function(time){
    timeDiv.innerHTML = time;
  }
  // add score
  var addScore = function(line){
    var s = 0;
    if (line>0){
      switch (line) {
        case 1:
          s = 10;
          break;
        case 2:
          s = 30;
          break;
        case 3:
          s = 60;
          break;
        default:
          s = 100
          break;
      }
    }
    score = score + s;
    scoreDiv.innerHTML = score;
  }
  // display game over
  var gameover = function(win){
	document.getElementById('waiting').innerHTML = '';
    if (win){
      resultDiv.innerHTML="You win :)";
    }else {
      resultDiv.innerHTML="You lose :(";
    }
  }
  // add tail lines
  var addTailLines = function(lines){
    for (var i=0; i<gameData.length-lines.length; i++){
      gameData[i]=gameData[i+lines.length];
    }
    for (var i=0; i<lines.length; i++){
      gameData[gameData.length-lines.length+i]=lines[i];
    }
    cur.origin.x = cur.origin.x-lines.length;
    if (cur.origin.x<0){
      cur.origin.x=0;
    }
    refreshDiv(gameData,gameDivs);
  }
  // initialization
  var init = function(doms, type ,dir){
    gameDiv = doms.gameDiv;
    nextDiv = doms.nextDiv;
    timeDiv = doms.timeDiv;
    scoreDiv = doms.scoreDiv;
    resultDiv = doms.resultDiv;
    next = squareFactory.prototype.make(type ,dir);
    initDiv(gameDiv, gameData, gameDivs);
    initDiv(nextDiv, next.data, nextDivs);
    refreshDiv(next.data, nextDivs);
  }
  // api
  this.init = init;
  this.down = down;
  this.left = left;
  this.right = right;
  this.rotate = rotate;
  this.fall = function(){while(down());};
  this.fixed = fixed;
  this.performNext = performNext;
  this.checkClear = checkClear;
  this.checkGameOver = checkGameOver;
  this.setTime = setTime;
  this.addScore = addScore;
  this.gameover = gameover;
  this.addTailLines = addTailLines;
}
