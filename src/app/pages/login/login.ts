import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']  
})
export class Login {
  email = '';
  password = '';

  constructor(private authService: Auth, private router: Router) {}

  onLogin() {
    const success = this.authService.login(this.email, this.password);
    if (success) {
      this.router.navigateByUrl('/home');
    } else {
      alert('Invalid credentials');
    }
  }
}
