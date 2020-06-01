import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private _showProfileComponent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  public showUserProfileComponentEmitter: Observable<boolean> = this._showProfileComponent.asObservable();

  constructor() { }

  isUserLoggedIn(ifShow: boolean) {
    this._showProfileComponent.next(ifShow);
  }
}
