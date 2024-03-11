import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { LoggedUser, Roles } from '../../models/auth.model';

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
