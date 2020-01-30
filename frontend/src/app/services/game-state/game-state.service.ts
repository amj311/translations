import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

class User {
  uid: String;
  points: String;
  role: String;
  nickname: String;

  constructor() {}
}

class GameState {
  players: [User];
  view: String;
  round: Number;


  constructor() {}
}

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  state$: BehaviorSubject<GameState>;
  state = new GameState();

  currentUser$: BehaviorSubject<User>;
  currentUser = new User();

  constructor() {
    this.state$ = new BehaviorSubject(this.state);

    this.state$.subscribe(
      res => {
        this.state = res;
      }
    )
  }

  updateUID(id) {
    this.currentUser.uid = id;
    this.updateCurrentUser();
  }
  
  updateState(){
    this.state$.next(this.state)
  }
  
  updateCurrentUser(){
    this.currentUser$.next(this.currentUser)
  }  

}