import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablesRoutingModule } from './tables-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {CustomFormsModule} from 'ng2-validation';
import {DropzoneModule} from 'ngx-dropzone-wrapper';
import { CreateUserComponent } from './create-user/create-user.component';
import { AgenciesComponent } from './agencies/agencies.component';
import { CreateAgencyComponent } from './create-agency/create-agency.component';

@NgModule({
  declarations: [  ManageUsersComponent, UserDetailComponent, CreateUserComponent, AgenciesComponent, CreateAgencyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TablesRoutingModule,
    NgxDatatableModule,
    CKEditorModule,
    CustomFormsModule,
    DropzoneModule

  ]
})
export class TablesModule { }
