import { RouterModule, Routes } from '@angular/router';
import { Register } from './pages/register/register';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { UserList } from './pages/user-list/user-list';
import { UserForm } from './pages/user-form/user-form';
import { RoleGuard } from './services/role.guard';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { authGuard } from './services/auth-guard-guard';
import { ReportComponent } from './pages/reports/reports';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'register', component: Register,canActivate:[authGuard] },
    { path: 'home', component: Home , canActivate: [authGuard] },
    { path: 'users', component: UserList ,canActivate: [authGuard]},
    { path: 'users/add', component: UserForm, canActivate: [RoleGuard],canActivateChild:[authGuard]},
    { path: 'users/edit/:id', component: UserForm ,canActivate:[authGuard]},
    { path: 'dashboard', component: DashboardComponent ,canActivate:[authGuard]},
    { path: 'reports', component: ReportComponent ,canActivate:[authGuard]},
    { path: '**', redirectTo: 'login' }

];

export class AppRoutingModule {}
