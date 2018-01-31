var socket = io.connect('http://localhost:4000');

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


// for feed back listen

feedback = document.getElementById('feedback');
		
socket.on('typing', function(data){

	feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
	
});
