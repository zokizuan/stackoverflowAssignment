import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { SidebarComponent } from '../feature/sidebar/sidebar.component';
import { HtmlToPlaintextPipe } from './pipe/markdown.pipe';


@NgModule({
  declarations: [
    SpinnerComponent,
    SidebarComponent,
    HtmlToPlaintextPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SidebarComponent,
    HtmlToPlaintextPipe
  ]
})
export class SharedModule { }
