import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services';
import { EventsService } from 'src/app/core/services/events.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loginform: FormGroup;
  showUserProfileComponent = false;
  user: any = null;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private eventsService: EventsService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.eventsService.showUserProfileComponentEmitter.subscribe(mode => {
      // mode will be null the first time it is created, so you need to igonore it when null
      if (mode !== null) {
        this.showUserProfileComponent = mode;
        this.user = sessionStorage.getItem('user');
      }
    });
  }

  login(value: any) {
    const username = value.username;
    const password = value.password;
    this.authService.login(username, password).subscribe(result => {
      document.getElementById('closeLogin').click()
      this.showUserProfileComponent = result
      this.toastService.showToast({ severity: 'success', summary: 'Login successful', detail: '' })
    }, error => {
      console.log(error);
    })
  }

  logout() {
    this.authService.logout();
  }

}
