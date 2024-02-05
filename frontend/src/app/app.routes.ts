import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component'
import { AddComponent } from './add/add.component'
import { HomeComponent } from './employee/home/home.component'
import { authGuard } from './guards/auth.guard'
import { noAuthGuard } from './guards/no-auth.guard'
import { AdminComponent } from './admin/admin.component'
import { TaskComponent } from './admin/task/task.component'
import { NewComponent } from './admin/task/new/new.component'
import { EditComponent } from './admin/task/edit/edit.component'
import { FinishComponent } from './finish/finish.component'
import { RankingComponent } from './admin/ranking/ranking.component'
import { EmployeeDetailsComponent } from './admin/employee-details/employee-details.component'

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
  },
  {
    path: 'finish/:id',
    canActivate: [authGuard],
    component: FinishComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'home',
        component: RankingComponent
      },
      {
        path: 'employee-details',
        component: EmployeeDetailsComponent
      },
      {
        path: 'task/edit/:id',
        component: EditComponent
      },
      {
        path: 'task/new',
        component: NewComponent
      },
      {
        path: 'task',
        component: TaskComponent,
      },
    ]
  }
];