import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component'
import { AddComponent } from './add/add.component'
import { HomeComponent } from './employee/home/home.component'
import { authGuard } from './guards/auth.guard'
import { noAuthGuard } from './guards/no-auth.guard'

export const routes: Routes = [
  { 
    path: '',
    pathMatch: 'full',
    redirectTo: 'punch-in'
  },
  { 
    path: 'punch-in',
    canActivate: [noAuthGuard],
    component: AuthComponent
  },
  { 
    path: 'register',
    canActivate: [noAuthGuard],
    component: AddComponent
  },
  {
    path: 'home',
    canActivate: [authGuard],
    component: HomeComponent
  }
];