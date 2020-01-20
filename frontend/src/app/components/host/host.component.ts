import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketService } from 'src/app/services/socket/socket.service';
import { Router } from '@angular/router';
import { GameStateService } from 'src/app/services/game-state/game-state.service';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {
  socket;
  roomID;
  players = [];
  bgMusic;
  sounds;
  musicOn = true;
  soundsOn = true;

  constructor(
    private http: HttpClient,
    private socketService: SocketService,
    public game: GameStateService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.bgMusic  = <HTMLVideoElement> document.getElementById('bg-music');
    this.sounds  = <HTMLVideoElement> document.getElementById('sounds');

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





  
  toggleMusic(){

    if (this.bgMusic.paused) {
      this.bgMusic.play();
      this.musicOn = true;
    }
    else {
      this.bgMusic.pause();
      this.musicOn = false;
    }
  }

  toggleSounds(){

    if (this.sounds.paused) {
      this.sounds.play();
      this.soundsOn = true;
    }
    else {
      this.sounds.pause();
      this.soundsOn = false;
    }
  }
  
}
