import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameStateService } from 'src/app/services/game-state/game-state.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  socket;
  reqRoomID = "";

  constructor(
    private http: HttpClient,
    private socketService: SocketService,
    private gameService: GameStateService,
    private router: Router,
  ) {}

  ngOnInit() {

    this.socketService.socket$.subscribe(
      res => {
        this.socket = res;
        
        this.socket.on('joinedRoom', id => {
          this.router.navigate(['play'])
        })

        this.socket.on('openHostRoom', id => {
          this.router.navigate(['host'])
        })

      }
    )

    this.socketService.reset();
  }

  handleStartNew(){
    console.log('starting new')
    this.socket.emit('hostNewRoom')
  }

  handleSubmitRoomID(){
    console.log('asking to join '+this.reqRoomID)
    this.socket.emit('requestToJoinRoom', this.reqRoomID.toLowerCase())
  }

}
