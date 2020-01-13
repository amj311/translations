var express = require('express');
var crypto = require('crypto')
var app = express();

var port = 4300;
var server = app.listen(port, function(){
  console.log(`listening on *:${port}`);
});

/* Models and State */
var GameRoom = require('./models/GameRoom')
var User = require('./models/User')
var rooms = []
var users = []

var io = require('socket.io')(server);

app.use(express.static('public'))

io.on('connection', function(socket){
	console.log('a user connected');

	var uid = crypto.randomBytes(16).toString('hex');
	
	var currentUser = new User({uid, socket})
	users.push(currentUser)

	console.log(currentUser.uid)

});
