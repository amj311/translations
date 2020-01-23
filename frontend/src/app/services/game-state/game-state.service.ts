import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

class GameData {
  players: String;
  role: String;
  view: String;
  uid: String;

  constructor() {}
}

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  data$: BehaviorSubject<GameData>;
  data = new GameData();

  constructor() {
    this.data$ = new BehaviorSubject(this.data);

    this.data$.subscribe(
      res => {
        this.data = res;
      }
    )
  }

  updateUID(id) {
    this.data.uid = id;
    this.updateObservable();
  }
  
  updateObservable(){
    this.data$.next(this.data)
  }  

}