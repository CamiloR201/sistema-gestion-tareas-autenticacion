import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'tasks', pathMatch: 'full' },
    {
        path: 'login',
        loadComponent: () =>
            import('./auth/login/login.component').then((m) => m.LoginComponent),
        canActivate: [guestGuard],
    },
    {
        path: 'register',
        loadComponent: () =>
            import('./auth/register/register.component').then((m) => m.RegisterComponent),
        canActivate: [guestGuard],
    },
    {
        path: 'tasks',
        loadComponent: () =>
            import('./tasks/task-list/task-list.component').then((m) => m.TaskListComponent),
        canActivate: [authGuard],
    },
    { path: '**', redirectTo: 'tasks' },
];
