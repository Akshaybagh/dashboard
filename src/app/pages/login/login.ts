import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']  
})

export class Login implements OnInit {
  email = '';
  password = '';
  users: any[] = [];
 
  constructor(private http: HttpClient, private auth: Auth, private router: Router) {}
 
  ngOnInit() {
    this.http.get<any[]>('/users.json').subscribe(data => {
      this.users = data;
    });
  }
 
  login() {
    const user = this.users.find(
      u => u.email?.toLowerCase() === this.email.trim().toLowerCase() && u.status === 'active'
    );
 
    if (!user) {
      alert('User not found or inactive');
      return;
    }
 
    if (this.password === 'pass') {
      const success = this.auth.login(this.email, this.password, user.userType);
      if (success) {
        this.router.navigate(['/home']);
      }
    } else {
      alert('Incorrect password');
    }
  }
}
