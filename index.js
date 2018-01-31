var express = require('express');

// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});



var socket = require('socket.io');
var io = socket(server);

// connection on with unique id
io.on('connection', (socket) => {
	console.log('made socket connection', socket.id);
});



app.use(express.static('public'));


// for connect & send chat emit


var io = socket(server);

io.on('connection', (socket) => {

	socket.on('chat', function(data){

		io.sockets.emit('chat', data);

	});

	// for broadcast & send typing emit


	socket.on('typing', function(data){

	    socket.broadcast.emit('typing', data);
	    
	});

});


