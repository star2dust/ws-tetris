var socket = io('http://star2dust.qicp.vip:30470');

var local = new Local(socket);
var remote = new Remote(socket);

socket.on('waiting', function(str){
  document.getElementById('waiting').innerHTML = str;
});
