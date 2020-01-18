class GameRoom {

    constructor(id) {
        this.id = id;
        this.host = null;
        this.players = [];
    }

    configureHost(user){
        user.makeHost(this)
        this.host = user;

        // do hostess stuff
        // do twinkie
        this.host.socket.emit('welcomeToHosting', this.id)

        this.host.socket.on('initiateCloseRoom', ()=> {
            this.handleClosure()
        })
    }

    startGame() {
        console.log('game started')
    }

    handleClosure(){
        this.players.forEach( p => {
            p.handleClosedRoom()
        })
        this.host.handleClosedRoom()
    }


    addPlayer(p) {
        this.players.push(p)
        p.joinRoom(this)
    }

    ejectPlayer(p){
    }
}

module.exports = GameRoom;