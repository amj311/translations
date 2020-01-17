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
  }


  
}
