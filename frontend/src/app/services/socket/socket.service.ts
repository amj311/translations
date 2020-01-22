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
        let oldID = localStorage.getItem('uid'); 
        if (oldID){
          console.log('previous uid:', oldID)
          let service  = this;
        
          this.socket.emit('findReturningUser', oldID, function(foundMatch) {
            if (foundMatch) {
              console.log('match was found for:', oldID)
              service.isReturningUser = true;
              service.setUID(oldID);
            }
            else {
              this.socket.emit('registerNewUser')
              this.isReturningUser = false;
            }
          })
        }

        else {
          console.log('no previous uid')
          this.socket.emit('registerNewUser')
        }
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

