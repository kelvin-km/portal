import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { ChartsModule as chartjsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { MorrisJsModule } from 'angular-morris-js';


@NgModule({
  declarations: [MainComponent, Dashboard2Component],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    chartjsModule,
    NgxEchartsModule,
    MorrisJsModule
  ]
})
export class DashboardModule { }
