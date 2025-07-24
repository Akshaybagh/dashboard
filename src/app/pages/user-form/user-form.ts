import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { User, UserService } from '../../services/user';
import { Navbar } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, Navbar],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.css'] 
})
export class UserForm {
  user: User = {
    id: 0,
    name: '',
    mobile: '',
    userType: '',
    status: ''
  };

  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.isEdit = true;
      this.userService.getUsers().subscribe(users => {
        const existing = users.find(u => u.id === id);
        if (existing) this.user = { ...existing };
      });
    }
  }

  saveUser(): void {
    if (this.isEdit) {
      this.userService.updateUser(this.user);
      alert('Updated successfully');
    } else {
      this.userService.addUser(this.user);
      alert('added successfully');
    }
    this.router.navigate(['/users']);
  }
}
