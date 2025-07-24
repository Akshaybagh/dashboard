import { Component, OnInit, signal } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Navbar,RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  loggedInUser = signal<string | null>('');
  ngOnInit(): void {
    this.loggedInUser.set(localStorage.getItem('email'));
  }
}
