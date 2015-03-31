

var app = require('express')();
var http = require('http').Server(app);
//var net = require('net');

//var app = express();
//var httpServer = http.createServer(app);
var io = require('socket.io')(http);
var path = require('path');
var express = require('express');
//var child = require('child_process');



app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res){
  res.sendFile('index.html',{root:__dirname});
});

io.on('connection', function(socket){
  console.log('a user connected');
	
	socket.on('disconnect', function(){
    	console.log('user disconnected');
 	 });

	socket.on('setvideo', function(data){
	    console.log('VideoSelected: ' + data);
  	});

	socket.on('setctrl', function(data){
	    console.log('Controller Selected: ' + data);
	});
	
	socket.on('vtest', function(data){
	    console.log('output path: ' +data);
	});
});

http.listen(3000,"0.0.0.0", function(){
  console.log('listening on *:3000');
});





