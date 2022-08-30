import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { HtmlToPlaintextPipe } from './pipe/plaintext.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { QuestionComponent } from './layout/questions-list/question/question.component';
import { QuestionsListComponent } from './layout/questions-list/questions-list.component';


const module = [
  NgxPaginationModule,
]
@NgModule({
  declarations: [
    QuestionsListComponent,
    QuestionComponent,
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
    QuestionsListComponent,
    QuestionComponent,
    ...module
  ]
})
export class SharedModule { }
