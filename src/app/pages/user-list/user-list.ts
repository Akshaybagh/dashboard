// import { Component, inject, signal } from '@angular/core';
// import { User, UserService } from '../../services/user';
// import { Router, RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { Navbar } from '../../shared/navbar/navbar';

// @Component({
//   selector: 'app-user-list',
//   imports: [CommonModule,RouterModule,Navbar],
//   templateUrl: './user-list.html',
//   styleUrl: './user-list.css'
// })
// export class UserList {
// // users: User[] = [];

// //   constructor(private userService: UserService, private router: Router) {}

// //   ngOnInit(): void {
// //     this.users = this.userService.getUsers();
// //   }

// //   editUser(id: number): void {
// //     this.router.navigate(['/users/edit', id]);
// //   }

// //   deleteUser(id: number): void {
// //     this.userService.deleteUser(id);
// //     this.users = this.userService.getUsers(); // Refresh list
// //   }
// private userService = inject(UserService);
//   users = signal<any[]>([]);
 
//   ngOnInit(): void {
//     this.userService.getUsers().subscribe(data => {
//       this.users.set(data);
//     });
//   }
  
// }
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { User, UserService } from '../../services/user';
import { Navbar } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.css'] 
})
export class UserList {
  private userService = inject(UserService);
  private router = inject(Router);

  users = signal<User[]>([]); 

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users.set(data); 
    });
  }

  editUser(id: number): void {
    this.router.navigate(['/users/edit', id]);
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id); 
    this.users.set(this.userService.getLocalUsers()); 
    alert('Record deleted successfully');
  }
}
