var User = require('./User')
var crypto = require('crypto')


class UserMngr {

    constructor() {
        this.list = []
    }

    //returns User
    createUser(socket) {
        let id = 'user_'+crypto.randomBytes(8).toString('hex');
	
		let newUser = new User({id, socket})
		this.list.push(newUser)

        console.log('users: '+this.list.map(u => u.id))
        return newUser;
    }

    deleteUser(user){
        user.beforeDestroy()
        this.list = this.list.filter(u => u.id != user.id)
        
        console.log('users: '+this.list.map(u => u.id))
    }



    handleLostUserConnection(user) {
        user.isConnected = false;
        const limboTime = 1000 * 5;
        
        console.log('\nLost connection to: '+user.id+`. Will terminate in ${limboTime}ms\n`)
        let userMngr = this;

        setTimeout( function() {
            if (!user.isConnected) {
                console.log('\n'+this.id+` remains inactive after ${limboTime}. It will now be terminated.\n`)
                userMngr.deleteUser(user)
            }
            else {
                console.log('\n'+user.id+' is connected and will not be destroyed.\n')
            }
        }, limboTime)
    }

    // updates existingUser to point to new socket
    handleUserReconnect(existingUser, socket) {
        existingUser.isConnected = true;
        existingUser.assignSocket(socket)

        return existingUser;
    }
    
}

module.exports = UserMngr;