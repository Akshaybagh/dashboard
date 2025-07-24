// src/app/guards/role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userType = localStorage.getItem('userType');
    if (userType === 'admin' || userType === 'manager') {
      return true;
    }
    else 
    return false;

    this.router.navigate(['/home']); // or redirect to unauthorized page
    return false;
  }
}
