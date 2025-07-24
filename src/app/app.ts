import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardComponent } from './pages/dashboard/dashboard';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('dashboard-app');
}
@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
 
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('/users.json');
  }
 
  //  getCollections(): Observable<any[]> {
  //   return this.http.get<any[]>('assets/collections.json');
  // }
}

// app.component.ts

@Component({
  selector: 'app-dashboard-root',
  standalone: true,
  imports: [DashboardComponent],
  template: `<app-dashboard />`
})
export class AppComponent {}
