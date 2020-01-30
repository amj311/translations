import { Component } from '@angular/core';
import { SocketService } from './services/socket/socket.service';
import { GameStateService } from './services/game-state/game-state.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  inDevMode;
  gameData;

  constructor(
    private socketService: SocketService,
    private gameService: GameStateService,
  ) {
    this.inDevMode = !environment.production;

    this.gameService.state$.subscribe(
      res => {
        this.gameData = res;
      }
    )
  }

}
