import { Component } from '@angular/core';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  musicIsOn = true;

  constructor(private socketService: SocketService) {

  }

  
  toggleMusic(){
    let audioPlayer = <HTMLVideoElement> document.getElementById('menu-music');

    if (audioPlayer.paused) {
      audioPlayer.play();
      this.musicIsOn = true;
    }
    else {
      audioPlayer.pause();
      this.musicIsOn = false;
    }
  }
}
