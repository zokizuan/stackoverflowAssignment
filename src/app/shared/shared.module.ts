import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { HtmlToPlaintextPipe } from './pipe/plaintext.pipe';


@NgModule({
  declarations: [
    SpinnerComponent,
    HtmlToPlaintextPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HtmlToPlaintextPipe,
    SpinnerComponent
  ]
})
export class SharedModule { }
