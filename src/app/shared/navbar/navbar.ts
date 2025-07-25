import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
   userType: string | null = '';
  constructor(private authService: Auth) {}
   ngOnInit(): void {
    this.userType = localStorage.getItem('userType'); 
  }
  logout() {
    this.authService.logout();
  }
}
