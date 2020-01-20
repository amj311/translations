import { Component } from '@angular/core';
import { SocketService } from './services/socket/socket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  inDevMode;

  constructor(
    private socketService: SocketService
  ) {
    this.inDevMode = !environment.production;
  }

}
