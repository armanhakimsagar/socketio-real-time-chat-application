# Nodejs socketio-real-time-chat-application
Components : Nodejs | Express | Broadcasting | V8 Engine | Streams and Buffers | Nodemon | MongoDb

Install :

[For chat app we need 2 package. express & socket package]


1. npm init 					(create package.json)

2. npm install express --save 		(download express packages)

3. npm install -g nodemon		 	(download nodemon packages)

  		

4. 	// create index.js

	// express app setup . port using 3000 
	
	var express = require('express');
	

	// App setup
	
	var app = express();
	
	var server = app.listen(4000, function(){
	
		console.log('listening for requests on port 4000,');
		
	});
		
	
	
5. cmd > nodemon index	(here index is index.js file)

	hit : http://127.0.0.1:4000


	
6. npm install socket.io --save 	(download socket io packages fro 2 way communication)
									(it have emit , socket.io & broadcast method)	



7. // Socket setup & pass server (index.js)

	var socket = require('socket.io');
	
	var io = socket(server);
	
	
	// connection on with unique id
	
	io.on('connection', (socket) => {

		console.log('made socket connection', socket.id);

	});
	
	
	
8. app.use(express.static('public'));	[create static route '/' public/index.html for display chat box]


9. create public folder & index.html file :

	<!DOCTYPE html>
	
	<html>
	
		<head>
		
			<meta charset="utf-8">
			<title>WebScockets 101</title>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.js"></script>
			<link href="/styles.css" rel="stylesheet" />
			
		</head>
		
		<body>

			<script src="/chat.js"></script>
			
		</body>
		
	</html>
	

10. // chat.js is another js file. on socket connection need 2 way communication.
	// thats way need to connect it in index.js & chat.js both side


	var socket = io.connect('http://localhost:4000');

	
11.  cmd > nodemon index 	[it will outout in cmd : made socket connection 'random string']
	
	 
12. // index.html display section setup 

	<div id="mario-chat">
	
		<div id="chat-window">
			<div id="output"></div>
		</div>
		
		<input id="handle" type="text" placeholder="Handle" />
		
		<input id="message" type="text" placeholder="Message" />
		
		<button id="send">Send</button>
		
	</div>
	
	
	
	
13. // emit is sending & socket.io means listening

	// first in chat.js get all data in variable.

	// check the click button then give emit the message
	
	// emit send the message to server & give a name to emit message
	
	// in socket.io part we can listen the emit message.
	
	// after listen give output in .io part
	


	var message = document.getElementById('message'),
	handle = document.getElementById('handle'),
	btn = document.getElementById('send'),
	output = document.getElementById('output');

	// Emit events
	
	btn.addEventListener('click', function(){
	
	  socket.emit('chat', {
		  message: message.value,
		  handle: handle.value
	  });
	  message.value = "";
	  
	});

	
	// Listen for events in client side
	
	
	socket.on('chat', function(data){
	
		output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
		
	});
	
	
	
14. // For receive chat in server side socket.on again

	// emit means send back message again to client



	var io = socket(server);
	
	io.on('connection', (socket) => {

		socket.on('chat', function(data){

			io.sockets.emit('chat', data);

		});

	});
	

15. // Broadcasting means send message to everyone without the sender :

	// we can use this in typing a message hint part.
	
	* in index.html (display section) :
	
		<div id="feedback"></div>
		
		
	
	* in chat.js :
	
		feedback = document.getElementById('feedback');
		
		socket.on('typing', function(data){
		
			feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
			
		});
	
	* in index.js :
	
		socket.on('typing', function(data){
		
			socket.broadcast.emit('typing', data);
			
		});
		
		
		
		
16. 
	
