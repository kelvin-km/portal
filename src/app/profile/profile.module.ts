import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {CustomFormsModule} from "ng2-validation";
import {DropzoneModule} from "ngx-dropzone-wrapper";
import {ProfileRoutingModule} from "./profile-routing.module";



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    NgxDatatableModule,
    CKEditorModule,
    CustomFormsModule,
    DropzoneModule
  ]
})
export class ProfileModule { }
