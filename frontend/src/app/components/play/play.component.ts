import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketService } from 'src/app/services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  socket;
  game;

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

    this.socket.on('handleClosedRoom', () => {
      this.router.navigate([''])
    })
  }

  
}
