$(function () {
	var socket = io.connect(), //we connect by using a websocket
	ui = {
		red: $('.btn-red'),
		orange: $('.btn-orange'),
		green: $('.btn-green'),
		off: $('.btn-off'),
		all: $('.btn')
	};

	$(document).click(function(e) {
	   console.log(e.target.className);

	   switch(e.target.className){
	     case "btn btn-red":
		 console.log("Red on");
		 socket.emit('set', 'red');
		 ui.red.addClass('is-active-red');
	         ui.orange.removeClass('is-active-orange');
	         ui.green.removeClass('is-active-green');
	         break;
		 break;

	     case "btn btn-red is-active-red":
		 console.log("Red off");
		 socket.emit('off');
		 ui.red.removeClass('is-active-red');
	         break;

	     case "btn btn-orange":
		 console.log("Orange on");
		 socket.emit('set', 'orange');
		 ui.orange.addClass('is-active-orange');
	         ui.red.removeClass('is-active-red');
	         ui.green.removeClass('is-active-green');
	         break;
		 break;

	     case "btn btn-orange is-active-orange":
		 console.log("Orange off");
		 socket.emit('off');
		 ui.orange.removeClass('is-active-orange');
		 break;

	     case "btn btn-green":
		 console.log("Green on");
		 socket.emit('set', 'green');
		 ui.green.addClass('is-active-green');
	         ui.orange.removeClass('is-active-orange');
	         ui.red.removeClass('is-active-red');
	         break;
		 break;

	     case "btn btn-green is-active-green":
		 console.log("Green off");
		 socket.emit('off');
		 ui.green.removeClass('is-active-green');
	         break;

	     case "btn btn-off": 
  	         socket.emit('off');
	         ui.red.removeClass('is-active-red');
	         ui.orange.removeClass('is-active-orange');
	         ui.green.removeClass('is-active-green');
	         break;
	   }
	}); 

});
