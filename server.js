var express = require('express');
var cors = require('cors');
var crypto = require('crypto')
var app = express();

app.use(express.static('frontend/dist/frontend/'))

app.use(cors({
	origin: 'http://localhost:4400'
}));


var port = 4300;
var server = app.listen(port, function(){
  console.log(`listening on *:${port}`);
});




// Models and State
var GameRoom = require('./models/GameRoom')
var UserMngr = require('./models/UserMngr')
var User = require('./models/User')
var ROLES = require('./models/Roles')

var userMngr = new UserMngr();
var rooms = []

// ENDPOINTS



// SOCKET LOGIC

var io = require('socket.io')(server);

io.on('connection', function(socket){
	var sockUser;


	socket.on('registerNewUser', ()=> {
		sockUser = userMngr.createUser(socket)
		socket.emit('assignUserID', sockUser.id)
	})



	socket.on('findReturningUser', uid => {
		let userMatch = userMngr.list.filter(u => u.id === uid)[0]

		if (userMatch) {
			console.log('found returning user'+userMatch.id)
			
			// updates userMatch to contain new socket
			sockUser = userMngr.handleUserReconnect(userMatch, socket)

			socket.emit('userIsReturning', sockUser.id);
		}
		else socket.emit('userIsNew');
	})


	socket.on('msg', msg => {
		console.log(msg)
	})


	socket.on('hostNewRoom', () => {

		if(sockUser.role === ROLES.user || sockUser.role === ROLES.host) {
			socket.emit('err', "User is already hosting or playing in another room.")
			return;
		}

		console.log('starting a new room')

		let newRoomId;
		do {
			newRoomId = crypto.randomBytes(3).toString('hex');
		} while ( rooms.filter( r => r.id === newRoomId ).length > 0 )

		let newRoom = new GameRoom(newRoomId);
		rooms.push(newRoom)

		socket.emit('openHostRoom', newRoomId)
		newRoom.configureHost(sockUser)

		console.log('rooms: '+rooms.map(r => r.id))

	})

	socket.on('hostClosedRoomComplete', id => {
		console.log('\nclosing room: '+id)
		rooms = rooms.filter(r => r.id != id)
		console.log('rooms: '+ rooms.map(r => r.id) +'\n')
	})






	socket.on('requestToJoinRoom', id => {
		let roomMatch = rooms.filter(r => r.id === id)[0]

		if (roomMatch) {
			console.log('user is joining room '+roomMatch.id)
			
			roomMatch.addPlayer(sockUser)
		}
		else socket.emit('err', 'There is no such room!');
	})



	socket.on('disconnect', () => {
		if (sockUser) userMngr.handleLostUserConnection(sockUser)
	})
});
