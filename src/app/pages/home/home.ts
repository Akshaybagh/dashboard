import { Component, OnInit, signal } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [Navbar,RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  loggedInUser = signal<string | null>('');
  isLoggedIn = false;
    constructor(private http: HttpClient,private router:Router) {}

  ngOnInit(): void {
     this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' ? true : false;
    if(!this.isLoggedIn){
      this.router.navigate(['/login']);
    }
    this.loggedInUser.set(localStorage.getItem('email'));
  }
}
