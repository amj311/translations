import { Injectable, OnInit } from '@angular/core';

import io from 'socket.io-client'
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket;
  socket$;
  isReturningUser = false;

  constructor( ) {
    
    this.socket$ = new BehaviorSubject(io(''))

    this.socket$.subscribe( res => {
      this.socket = res;

      this.socket.on('connect', () => {
        console.log('connected')

        // Logic for returning user
        if (localStorage.getItem('uid')){
          console.log('previous uid:',localStorage.getItem('uid'))
          this.socket.emit('findReturningUser', localStorage.getItem('uid'))
        }
        else {
          console.log('no previous uid')
          this.socket.emit('registerNewUser')
        }
      })


      this.socket.on('userIsReturning', matchId => {
        console.log('match was found for:', matchId)
        this.isReturningUser = true;
        this.setUID(matchId)
      })

      
      this.socket.on('userIsNew', () => {
        this.socket.emit('registerNewUser')
        this.isReturningUser = false;
      })

      
      this.socket.on('assignUserID', (uid)=>{
        this.setUID(uid)
      })
      

      
      this.socket.on('msg', (msg)=> console.log(msg) )
      this.socket.on('err', (err)=> console.error(err) )


    })


    

  }

  ngOnInit(){

  }

  setUID(id){
    localStorage.setItem('uid',id)
    console.log('I am now user: '+id)
  }

  reset(){
    this.socket.close()
    this.socket$.next(io(environment.socketURL))

    
  }

}

