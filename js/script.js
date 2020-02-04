var socket = io('http://290q11m963.wicp.vip:80');
var local = new Local(socket);
var remote = new Remote(socket);

socket.on('waiting', function(str){
  document.getElementById('waiting').innerHTML = str;
});
