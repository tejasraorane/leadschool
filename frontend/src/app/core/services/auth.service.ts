import { Injectable, EventEmitter } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventsService } from './events.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isUserLoggedIn = true;

  public onLogin: EventEmitter<any>;
  public onLogout: EventEmitter<any>;

  constructor(
    private http: HttpService,
    private eventsService: EventsService,
    private router: Router
  ) { 
    this.isUserLoggedIn = this.getUserLoggedIn();
  }

  getUserLoggedIn() {
    if (sessionStorage.getItem("user")) {
      this.isUserLoggedIn = true;
      this.eventsService.isUserLoggedIn(true);
      return true;
    }
      return false;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.Post('api/v1/admin/authenticate', {
      username: username,
      password: password
    }).pipe(map(this._authenticate));
  }

  _authenticate(response: Response) {
    let user: any = response;
    console.log(user);
    if(!user) {
      return false;
    }
    this.onLogin = new EventEmitter();
    sessionStorage.setItem('user', user.user.username);
    sessionStorage.setItem('token', user.token);
    this.onLogin.emit();
    return true;
  }

  logout() {
    this.onLogout = new EventEmitter();
    this.isUserLoggedIn = false;
    this.eventsService.isUserLoggedIn(false);
    this.onLogout.emit();
    this.router.navigate(['']);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  }
}
