import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {


  roomId: String;
  userId: String;
  players: [String];
  role: String;
  view: String;
  
  constructor() {

  }

  

}