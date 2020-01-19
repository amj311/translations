import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketService } from 'src/app/services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {
  socket;
  roomID;
  players = [];

  constructor(
    private http: HttpClient,
    private socketService: SocketService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.socketService.socket$.subscribe(
      res => {
        this.socket = res;
      }
    )

    this.socket.on('welcomeToHosting', id => {
      this.roomID = id;
      console.log('i am now hosting room '+id)
    })

    this.socket.on('handleClosedRoom', () => {
      this.socket.emit('hostClosedRoomComplete', this.roomID)
      this.roomID = null;
      this.router.navigate([''])
    })

    this.socket.on('newPlayerJoined', pid=> {
      this.players.push(pid)
    })

  }

  closeRoom(){
    this.socket.emit('initiateCloseRoom')
  }

  
}
