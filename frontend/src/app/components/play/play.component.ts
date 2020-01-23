import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketService } from 'src/app/services/socket/socket.service';
import { Router } from '@angular/router';
import { GameStateService } from 'src/app/services/game-state/game-state.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  socket;
  gameData;

  constructor(
    private http: HttpClient,
    private socketService: SocketService,
    private gameService: GameStateService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.socketService.socket$.subscribe(
      res => {
        this.socket = res;
      }
    )

    this.gameService.data$.subscribe(
      res => {
        this.gameData = res;
      }
    )

    this.socket.on('handleClosedRoom', () => {
      this.router.navigate([''])
    })
  }

  
}