import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { HtmlToPlaintextPipe } from './pipe/plaintext.pipe';
import {NgxPaginationModule} from 'ngx-pagination';

const module = [
  NgxPaginationModule,
]
@NgModule({
  declarations: [
    SpinnerComponent,
    HtmlToPlaintextPipe
  ],
  imports: [
    CommonModule,
    ...module
  ],
  exports: [
    HtmlToPlaintextPipe,
    SpinnerComponent,
    ...module
  ]
})
export class SharedModule { }
