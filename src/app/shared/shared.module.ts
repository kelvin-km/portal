import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FilterPipe} from "./guard/filter.pipe";
import {ClickOutsideDirective} from "./dropdown.directive";



@NgModule({
  imports: [
    CommonModule

  ],
  declarations: [
    FilterPipe,
    ClickOutsideDirective
  ],
  exports: [
    FilterPipe,
    ClickOutsideDirective
  ]
})
export class SharedModule { }
