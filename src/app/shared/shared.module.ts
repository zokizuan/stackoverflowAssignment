import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { HtmlToPlaintextPipe } from './pipe/markdown.pipe';


@NgModule({
  declarations: [
    SpinnerComponent,
    HtmlToPlaintextPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HtmlToPlaintextPipe
  ]
})
export class SharedModule { }
