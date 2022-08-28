import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { SidebarComponent } from '../feature/sidebar/sidebar.component';
import { MarkdownPipe } from './pipe/markdown.pipe';


@NgModule({
  declarations: [
    SpinnerComponent,
    SidebarComponent,
    MarkdownPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SidebarComponent,
    MarkdownPipe
  ]
})
export class SharedModule { }
