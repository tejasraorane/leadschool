import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashBoardRoutingModule } from './dashboard-routing.module';
import { CategoriesPipe } from './categories.pipe';

@NgModule({
  declarations: [
    DashboardComponent, 
    CategoriesPipe
  ],
  imports: [
    SharedModule,
    DashBoardRoutingModule
  ]
})
export class DashboardModule { }
