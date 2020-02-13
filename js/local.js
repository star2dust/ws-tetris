var Local = function(socket){
  // game object
  var game;
  // interval
  var test = false;
  var INTERVAL = 500; // ms
  var INTERVAL_TEST = 2000;
  // timer
  var timer = null;
  // time count
  var timeCount = 0;
  // current time
  var time = 0;
  
  
  var browser={
    versions:function(){ 
           var u = navigator.userAgent, app = navigator.appVersion; 
           return {//移动终端浏览器版本信息 
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad  
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                weixin: u.indexOf('MicroMessenger') > -1, //是否微信 
                qq: u.match(/\sQQ/i) == " qq" //是否QQ
            };
         }(),
         language:(navigator.browserLanguage || navigator.language).toLowerCase()
  } 
  
  // display instruction
  var dispIns = function(){
	  if(browser.versions.mobile || browser.versions.ios || browser.versions.android || 
  	browser.versions.iPhone || browser.versions.iPad){
		document.getElementById('waiting').innerHTML = 'Play with buttons: up -> rotate, center -> fall.'
	}else{
		document.getElementById('waiting').innerHTML = 'Play with direction and space keys: up -> rotate, space -> fall.'
	}
  }
  
  
  // bind keyboard event
  var bindKeyEvent = function(){
    document.onkeydown = function(e){
      switch (e.keyCode) {
        case 38: game.rotate(); socket.emit('rotate'); break; // up
        case 39: game.right(); socket.emit('right'); break; // right
        case 40: game.down(); socket.emit('down'); break; // down
        case 37: game.left(); socket.emit('left'); break; // left
        case 32: game.fall(); socket.emit('fall'); break; // space
		case 65: game.left(); socket.emit('left'); break; // left (A)
		case 68: game.right(); socket.emit('right'); break; // right (D)
		case 87: game.rotate(); socket.emit('rotate'); break; // up (W)
        case 83: game.down(); socket.emit('down'); break; // down (S)
        default: break;
      }
    }
  }
  // bind button events
  var bindBtnEvent = function(){
	//if(browser.versions.mobile || browser.versions.ios || browser.versions.android || 
  	//browser.versions.iPhone || browser.versions.iPad){  
		var btn = {
			down: document.getElementById('down'),
			left: document.getElementById('left'),
			right: document.getElementById('right'),
			rotate: document.getElementById('rotate'),
			fall: document.getElementById('fall'),
		}
		btn.down.onclick = function(){
			if (!document.onkeydown){
			  game.down(); 
			  socket.emit('down');
			}
		}
		btn.left.onclick = function(){
			if (!document.onkeydown){
			  game.left(); 
			  socket.emit('left');
			}
		}
		btn.right.onclick = function(){
			if (!document.onkeydown){
			  game.right(); 
			  socket.emit('right'); 
			}
		}
		btn.rotate.onclick = function(){
			if (!document.onkeydown){
			  game.rotate(); 
			  socket.emit('rotate'); 
			}
		}
		btn.fall.onclick = function(){
			if (!document.onkeydown){
			  game.fall(); 
			  socket.emit('fall');
			}
		}
		btn.left.onmousedown = function(e){
			tid = setInterval(function(){
				game.left(); 
				socket.emit('left');
			},INTERVAL/10);
		};
		btn.left.onmouseup = function(e){
			clearInterval(tid);
		}
		btn.left.onmouseout = function(e){
			clearInterval(tid);
		}
		btn.right.onmousedown = function(e){
			tid = setInterval(function(){
				game.right();
				socket.emit('right');				
			},INTERVAL/10);
		};
		btn.right.onmouseup = function(e){
			clearInterval(tid);
		}
		btn.right.onmouseout = function(e){
			clearInterval(tid);
		}
		btn.rotate.onmousedown = function(e){
			tid = setInterval(function(){
				game.rotate(); 
				socket.emit('rotate'); 
			},INTERVAL/5);
		};
		btn.rotate.onmouseup = function(e){
			clearInterval(tid);
		}
		btn.rotate.onmouseout = function(e){
			clearInterval(tid);
		}
	//}
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
        document.getElementById('remote_gameover').innerHTML = 'You win :)';
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
  // generate disturbance line
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
	var CountNum = 5; 
	if (!test){
		CountNum = 1000/INTERVAL;
	}	
    if (timeCount == CountNum){
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
    start();
	dispIns();
  });

  socket.on('lose',function(){
    game.gameover(true);
    stop();
  });

  socket.on('leave',function(){
    document.getElementById('local_gameover').innerHTML = 'Disconnect.';
	document.getElementById('waiting').innerHTML = '';
    document.getElementById('remote_gameover').innerHTML = 'Disconnect.';
    stop();
  });

  socket.on('bottomLine',function(data){
    game.addTailLines(data);
    socket.emit('addTailLines',data);
  })
}
