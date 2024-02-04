import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component'
import { AddComponent } from './add/add.component'

export const routes: Routes = [
  { 
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  { 
    path: 'auth',
    component: AuthComponent
  },
  { 
    path: 'add',
    component: AddComponent
  },
];