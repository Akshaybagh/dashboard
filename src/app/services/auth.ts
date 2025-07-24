import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private isLoggedInStatus = false;

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    if (password === 'pass') {
      this.isLoggedInStatus = true;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('email', email);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedInStatus = false;
    localStorage.removeItem('isLoggedIn');
    this.router.navigateByUrl('/login');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
