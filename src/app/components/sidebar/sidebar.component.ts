import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { LoggedUser, Roles } from '../../models/auth.model';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  public loggedUser = this.localStorageService.getUserData() as LoggedUser || null;
  public roles = Roles;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  handleLogout() {
    this.localStorageService.deleteUserData();
    this.router.navigate(['/']);
  }
}
