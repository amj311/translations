var ROLES = require('./Roles')

class User {

    constructor(props) {
        this.isConnected = true;
        this.id = props.id || null;
        this.socket = props.socket || null;
        this.room = props.room || null;
        this.role = props.role || null;
    }

    assignSocket(socket){
        this.socket = socket;
    }

    makeHost(room){
        this.role = ROLES.host;
        this.room = room;
    }

    // MOVE THISS LOGIC TO USERLIST CLASS
    

    /////////////////////////////////////

    beforeDestroy(){
        console.log('do these things before destroying user: '+this.id)
    }
}

module.exports = User;