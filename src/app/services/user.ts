// src/app/users/user.service.ts
export interface User {
  id: number;
  name: string;
  mobile: string;
  userType: string;
  status: string;
}
import { inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private users: User[] = [];

  private usersLoaded = false;

  getUsers(): Observable<User[]> {
    if (this.usersLoaded) {
      return of(this.users); 
    }

    return this.http.get<User[]>('/users.json').pipe(
      tap(data => {
        this.users = data;
        this.usersLoaded = true;
      }),
      map(() => this.users)
    );
  }

  getUserById(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }

  addUser(user: User): void {
    user.id = Date.now(); // Generate ID
    this.users.push(user);
  }

  updateUser(user: User): void {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index > -1) this.users[index] = user;
  }
  getLocalUsers(): User[] {
  return this.users;
  }

  deleteUser(id: number): void {
    this.users = this.users.filter(u => u.id !== id);
  }
}
