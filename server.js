

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var express = require('express');
var child = require('child_process');


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
	/*if(data=='/dev/video0'){
        var cmd = 'gst-launch-0.10';
        var options = null;
        var args =
            ['v4l2src',
                '!', 'video/x-raw-rgb,framerate=30/1',
                '!', 'ffmpegcolorspace',
                '!', 'vp8enc', 'speed=2',
                '!', 'queue2',
                '!', 'm.', 'webmmux', 'name=m', 'streamable=true',
                '!', 'tcpserversink', 'host=localhost',
                    'port=3001'];
        var gstMuxer = child.spawn(cmd, args, options);*/

       // gstMuxer.stderr.on('data', onSpawnError);
       // gstMuxer.on('exit', onSpawnExit);

    //}
    // else{gstMuxer.kill();}

	console.log('VideoSelected: ' + data);
  	});

	socket.on('setctrl', function(data){
	console.log('Controller Selected: ' + data);
	});
	
	socket.on('vtest', function(data){
	console.log('output path: ' +data);
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

var cmd = 'gst-launch-0.10';
var options = null;
var args1 = //vp8enc
    ['v4l2src',
        '!', 'video/x-raw-rgb,framerate=30/1',
        '!', 'ffmpegcolorspace',
        '!', 'vp8enc', 'speed=2',
        '!', 'queue2',
        '!', 'm.', 'webmmux', 'name=m', 'streamable=true',
        '!', 'tcpserversink', 'host=localhost',
        'port=3001'];
var args2 = //theora enc
    ['v4l2src',// device=/dev/video0',
        '!', 'video/x-raw-yuv, width=500, height=300,framerate=30/1',
        '!', 'theoraenc',
        '!', 'oggmux',
        '!', 'tcpserversink',
        'port=3001'];
var gstMuxer = child.spawn(cmd, args2, options);