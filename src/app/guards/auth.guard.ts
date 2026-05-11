import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    const requiredRoles = route.data['roles'] as string[] | undefined;
    if (requiredRoles && requiredRoles.length > 0) {
      const ok = requiredRoles.some(r => this.auth.hasRole(r));
      if (!ok) {
        this.router.navigateByUrl('/forbidden');
        return false;
      }
    }
    return true;
  }
}
