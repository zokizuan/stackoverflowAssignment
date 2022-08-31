import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from 'src/app/models/search.model';
import { RootStateService } from 'src/app/services/root-state.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  constructor(private rootStateService:RootStateService) { }
  response$!: Observable<APIResponse>
  ngOnInit(): void {
    this.response$ = this.rootStateService.response$
    this.rootStateService.getTopQuestions();
  }

}
