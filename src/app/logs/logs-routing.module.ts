import {RouterModule, Routes} from "@angular/router";
import {NgModule} from '@angular/core';
import {LogComponent} from './log/log.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'logs',
    pathMatch: 'full'
  },
  {
    path: 'logs',
    component: LogComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }
