import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';

// Pages
import { LoginComponent } from './pages/login/login.component';
import { LocationComponent } from './pages/location/location.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { adminGuard, loggedGuard } from './guards/auth.guard';
import { UsersComponent } from './pages/users/users.component';
import { AddVolunteerComponent } from './pages/add-volunteer/add-volunteer.component';


const routes: Routes = [
  {
    path: 'jornadas/:id',
    component: AddVolunteerComponent,
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
