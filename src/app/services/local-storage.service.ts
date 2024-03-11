import { Injectable } from '@angular/core';
import { LoggedUser, Roles } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private adminsRoles: string[] = [Roles.ADMIN, Roles.STATE_MANAGER];

  constructor() { }

  setUserData(data: LoggedUser) {
    localStorage.setItem('user', JSON.stringify(data));
  }


  /**
   * Get the full data of the user stored in local storage
   * @returns
   */
  getUserData(): LoggedUser | null {
    const user = localStorage.getItem('user');

    if (user) {
      return JSON.parse(user) as LoggedUser;
    } else {
      return null;
    }
  }

  /**
   * Get the token stored in local storage
   * @returns
   */
  getUserToken(): string | null {
    const user = this.getUserData();

    if (user) {
      return user.accessToken;
    } else {
      return null;
    }
  }

  /**
   * Check if the logged user is admin or state manager
   * @returns
   */
  isAdmin(): boolean {
    const user = this.getUserData();
    if (!user) {
      return false;
    }

    return this.adminsRoles.includes(user.role.name);
  }

  deleteUserData() {
    localStorage.removeItem('user');
  }
}
