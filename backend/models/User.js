class User {

    constructor(props) {
        this.uid = props.uid || null;
        this.socket = props.socket || null;
    }

    assignSocket(socket){
        this.socket = socket;
    }
    
}

module.exports = User;