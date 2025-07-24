import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  email = '';
  password = '';
  name = '';

  constructor(private router: Router) {}

  registerUser() {
    alert('Registration successful (dummy)');
    this.router.navigateByUrl('/login');
  }
}
