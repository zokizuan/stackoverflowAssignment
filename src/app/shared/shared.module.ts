import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { SidebarComponent } from '../feature/sidebar/sidebar.component';


@NgModule({
  declarations: [
    SpinnerComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
  SidebarComponent
  ]
})
export class SharedModule { }
