import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ManageUsersComponent} from './manage-users/manage-users.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {AgenciesComponent} from './agencies/agencies.component';
import {CreateAgencyComponent} from './create-agency/create-agency.component';
// create_agency
const routes: Routes = [
  {
    path: '',
    redirectTo: 'users-list',
    pathMatch: 'full'
  },
  {
    path: 'create_user',
    component: CreateUserComponent
  },
  {
    path: 'users-list',
    component: ManageUsersComponent
  },
  {
    path: 'users-detail',
    component: UserDetailComponent
  },
  {
    path: 'agencies',
    component: AgenciesComponent
  },  {
    path: 'create_agency',
    component: CreateAgencyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule { }
