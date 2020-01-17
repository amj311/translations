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
    let player = document.getElementById('menu-music')
    if (player.paused) {
      player.play();
      this.musicIsOn = true;
    }
    else {
      player.pause();
      this.musicIsOn = false;
    }
  }
}
