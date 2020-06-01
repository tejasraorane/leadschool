import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderState } from './loader.model';
import { LoaderService } from '../../services';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  loading: boolean = false;

  private subscription: Subscription;
  
  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.loading = state.show;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
