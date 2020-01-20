var ROLES = require('./Roles')

class User {

    constructor(props) {
        this.isConnected = true;
        this.id = props.id || null;
        this.socket = props.socket || null;
        this.room = props.room || null;
        this.role = props.role || null;
        this.gameData = props.role || null;
    }

    assignSocket(socket){
        this.socket = socket;
    }

    makeHost(room){
        this.role = ROLES.host;
        this.room = room;
    }


    joinRoom(room) {
        this.role = ROLES.player;
        this.room = room;

        this.socket.emit('joinedRoom', this.room.id)
    }
    
    handleClosedRoom(){
        this.gameData = null;
        this.room = null;
        this.role = null;

        this.socket.emit('handleClosedRoom')
    }

    // MOVE THISS LOGIC TO USERLIST CLASS
    

    /////////////////////////////////////

    beforeDestroy(){
        console.log('do these things before destroying user: '+this.id)
    }
}

module.exports = User;