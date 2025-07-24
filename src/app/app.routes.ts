import { RouterModule, Routes } from '@angular/router';
import { Register } from './pages/register/register';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { UserList } from './pages/user-list/user-list';
import { UserForm } from './pages/user-form/user-form';
import { DashboardComponent } from './pages/dashboard/dashboard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'home', component: Home },
    { path: 'users', component: UserList },
    { path: 'users/add', component: UserForm },
    { path: 'users/edit/:id', component: UserForm },
    { path: 'dashboard', component: DashboardComponent }

];

export class AppRoutingModule {}
