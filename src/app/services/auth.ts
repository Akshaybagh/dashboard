import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private isLoggedInStatus = false;

  constructor(private router: Router) {}

  login(email: string, password: string, userType: string): boolean {
    if (password === 'pass') {
      this.isLoggedInStatus = true;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('email', email);
      localStorage.setItem('userType', userType);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedInStatus = false;
      localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('email');
    localStorage.removeItem('userType');
    this.router.navigateByUrl('/login');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getUserType(): string {
    return localStorage.getItem('userType') || '';
  }
}