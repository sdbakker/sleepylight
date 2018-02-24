var express = require('express'),
    http    = require('http'),
    path    = require('path'),
    async   = require('async'),
    gpio    = require('pi-gpio'),
    sleep   = require('sleep');
    app     = express();

app.set('port', 3000);
app.use(express.static(path.join(__dirname, '/static')));

var http = http.createServer(app).listen(app.get('port'), function() {
		console.log('SleepLight server listening on port: ' + app.get('port'));
	});

var io = require('socket.io')(http);

var sleepLight = {

	lights: {
		RED: 	33,
		ORANGE: 35,
		GREEN:  37	
	},

	lightSwitch: {
		OFF:	0,
		ON: 	1
	},

	init: function() {
		gpio.open(this.lights.RED,    "out", function(err) { console.log('RED: '    + err); });
		gpio.open(this.lights.ORANGE, "out", function(err) { console.log('ORANGE: ' + err); });
		gpio.open(this.lights.GREEN,  "out", function(err) { console.log('GREEN: '  + err); });
	},

	set: function(color, state) {
		gpio.write(color, state);
	},

	off: function() {
		this.set(this.lights.RED, this.lightSwitch.OFF);
		this.set(this.lights.ORANGE, this.lightSwitch.OFF);
		this.set(this.lights.GREEN, this.lightSwitch.OFF);
	}
};

io.sockets.on('connection', function(socket) {
	console.log("connection");
	socket.on('set', function(color) {
		console.log("set: " + color);
		switch(color) {
			case 'red':
				sleepLight.set(sleepLight.lights.RED, sleepLight.lightSwitch.ON);
				sleepLight.set(sleepLight.lights.ORANGE, sleepLight.lightSwitch.OFF);
				sleepLight.set(sleepLight.lights.GREEN, sleepLight.lightSwitch.OFF);
				break;
			case 'orange':
				sleepLight.set(sleepLight.lights.ORANGE, sleepLight.lightSwitch.ON);
				sleepLight.set(sleepLight.lights.RED, sleepLight.lightSwitch.OFF);
				sleepLight.set(sleepLight.lights.GREEN, sleepLight.lightSwitch.OFF);
				break;
			case 'green':
				sleepLight.set(sleepLight.lights.GREEN, sleepLight.lightSwitch.ON);
				sleepLight.set(sleepLight.lights.ORANGE, sleepLight.lightSwitch.OFF);
				sleepLight.set(sleepLight.lights.RED, sleepLight.lightSwitch.OFF);
				break;
		}
	});

	socket.on('off', function() {
		console.log("all off");
		sleepLight.off();
	});
});

sleepLight.init();
setTimeout(function() { sleepLight.set(sleepLight.lights.RED, sleepLight.lightSwitch.ON); }, 2000);
