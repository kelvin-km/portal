import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogComponent } from './log/log.component';
import {LogsRoutingModule} from './logs-routing.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormsModule} from '@angular/forms';
import {DropzoneModule} from 'ngx-dropzone-wrapper';



@NgModule({
  declarations: [LogComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    DropzoneModule,
    LogsRoutingModule
  ]
})
export class LogsModule { }
