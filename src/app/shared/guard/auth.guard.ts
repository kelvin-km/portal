import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ApiService} from '../../services/api.services';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor( public api: ApiService, private auth: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // new route
    if (this.auth.isLoggedIn()) {
      const currentUser = this.auth.currentUserValue;
      if (currentUser) {
        // check if route is restricted by role
        if (!currentUser.roleID || currentUser.roleID == 0) {
          // role not authorised so redirect to home page
          this.api.showNotification('bg-red', 'No roles assigned');
          this.router.navigate(['/authentication/signin']);
          return false;
        } else {
          if (currentUser.verification == 0) {
            this.router.navigate(['/profile/profile']);
            this.api.showNotification('bg-orange', 'Kindly update your password to continue..');
            return false;
          } else {
            return true;
          }
        }
      }
    } else {
      this.router.navigate(['/authentication/signin']);
      return false;
    }
  }
}
