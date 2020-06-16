import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './shared/guard/auth.guard';

const routes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard]
    },
    {
        path: 'users',
        loadChildren: () => import('./users/tables.module').then(m => m.TablesModule), canActivate: [AuthGuard]
    },
    {
        path: 'authentication',
        loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
    },
  {
        path: 'logs',
        loadChildren: () => import('./logs/logs.module').then(m => m.LogsModule), canActivate: [AuthGuard]
    },
  {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
    },
    {
        path: '',
        redirectTo: 'authentication',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
