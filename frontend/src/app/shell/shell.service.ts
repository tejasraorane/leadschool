import { Routes, Route } from '@angular/router';

import { ShellComponent } from './shell.component';

export class Shell {

  static childRoutes(routes: Routes, noAuth?: boolean): Route {
    return {
      path: '',
      component: ShellComponent,
      children: routes,
      //canActivate: noAuth ? [NoAuthGuard] : [AuthGuard],
      // Reuse ShellComponent instance when navigating between child views
      data: { reuse: true }
    };
  }
}
