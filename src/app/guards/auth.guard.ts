import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { LocalStorageService } from '../services/local-storage.service';

/**
 * Apply to routes that only admin and state manager can access
 * @param route
 * @param state
 * @returns
 */
export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(LocalStorageService).isAdmin();
};

/**
 * Apply to routes that only logged users can access
 * @param route
 * @param state
 * @returns
 */
export const loggedGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return !!inject(LocalStorageService).getUserData();
};
