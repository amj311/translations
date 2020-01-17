class GameRoom {

    constructor(id, host) {
        this.id = id;
        this.host = null;
        this.players = [];
    }

    configureHost(user){
        user.makeHost(this)
        this.host = user;

        // do hostess stuff
        // do twinkie
    }

    startGame() {
        console.log('game started')
    }
}

module.exports = GameRoom;