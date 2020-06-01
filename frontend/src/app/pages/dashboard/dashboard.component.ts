import { Component, OnInit } from '@angular/core';
import { AuthService, HttpService } from 'src/app/core/services';
import { ToastService } from 'src/app/shared/services';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isUserLoggedIn = false
  courses: Array<any> = []
  commonFilter: string = ''
  categoryFilter: string = ''
  page: number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private http: HttpService,
    private toastService: ToastService
  ) { 
    this.isUserLoggedIn = this.authService.getUserLoggedIn();
  }

  ngOnInit(): void {
    this.listCourses()
  }

  listCourses() {
    this.http.Post<Array<any>>('api/v1/course/list', { 
      page: this.page,
      filter: this.commonFilter,
      category_filter: this.categoryFilter
    }).subscribe(courses => {
      if(courses.length == 0) {
        this.page = this.page > 1 ? this.page - 1 : this.page
        this.toastService.showToast({ severity: 'info', summary: 'No more courses found', detail: '' })
        return
      }
      this.courses = courses
    }, error => {
      console.error(error)
    })
  }

  next() {
    this.page = this.page + 1
    this.listCourses()
  }

  previous() {
    this.page = this.page - 1
    this.listCourses()
  }
}
