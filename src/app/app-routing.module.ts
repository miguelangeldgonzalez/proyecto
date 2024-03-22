import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';

import { adminGuard, loggedGuard } from './guards/auth.guard';

// Pages
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages/login/login.component';
import { SingUpComponent } from './pages/sing-up/sing-up.component';
import { WorkdayReportComponent } from './pages/workday-report/workday-report.component';
import { LocationComponent } from './pages/location/location.component';
import { DashboardComponent } from './pages/workday/workday.component';



const routes: Routes = [
  {
    path: 'jornadas/:id',
    component: WorkdayReportComponent,
    canActivate: [loggedGuard]
  },
  {
    path: '',
    component: LoginComponent,
    canActivate: [(r: ActivatedRouteSnapshot, s: RouterStateSnapshot) => !(loggedGuard(r, s))],
    data: {
      authGuardRedirect: '/jornadas'
    }
  },
  {
    path: 'set-password',
    component: SingUpComponent
  },
  {
    path: 'jornadas',
    component: DashboardComponent,
    canActivate: [loggedGuard]

  },
  {
    path: 'ubicaciones',
    component: LocationComponent,
    canActivate: [adminGuard],
    data: {
      authGuardRedirect: ''
    }
  },
  {
    path: 'usuarios',
    component: UsersComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
