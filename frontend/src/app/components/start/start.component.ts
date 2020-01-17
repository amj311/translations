import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketService } from 'src/app/services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  socket;
  reqRoomID: String = "";

  constructor(
    private http: HttpClient,
    private socketService: SocketService,  
    private router: Router,
  ) {}

  ngOnInit() {

    this.socketService.socket$.subscribe(
      res => {
        this.socket = res;
      }
    )

    this.socket.on('joinedRoom', player => {
      this.router.navigate(['play'])

    })

    this.socket.on('openHostRoom', id => {
      this.router.navigate(['host'])
      console.log('i am now hosting room: '+id)
    })



  }

  handleStartNew(){
    console.log('starting new')
    this.socket.emit('hostNewRoom')
  }

  handleSubmitRoomID(){
    console.log('asking to join '+this.reqRoomID)
    this.socket.emit('requestToJoinRoom')
  }

}
