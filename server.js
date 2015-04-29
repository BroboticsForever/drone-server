

var app = require('express')();
var http = require('http').Server(app);
//var net = require('net');

//var app = express();
//var httpServer = http.createServer(app);
var cv = require('opencv');
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

    socket.on('frame', function(data) {
        var _ref;
        if (typeof data !== 'string') {
            return;
        }
        data = data != null ? (_ref = data.split(',')) != null ? _ref[1] : void 0 : void 0;
        return cv.readImage(new Buffer(data, 'base64'), function (err, im) {
            return im.detectObject("./node_modules/opencv/data/haarcascade_frontalface_alt2.xml", {}, function (err, objects) {
               // console.log('got to cv');
                if (!((objects != null ? objects.length : void 0) > 0)) {
                    return socket.emit('objects', []);
                }
                return socket.volatile.emit('objects', objects);

            })
        });
    });
});

http.listen(3000,"0.0.0.0", function(){
  console.log('listening on *:3000');
});
