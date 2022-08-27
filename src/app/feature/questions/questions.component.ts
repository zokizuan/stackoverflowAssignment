import { Component, OnInit } from '@angular/core';
import { RootStateService } from 'src/app/services/root-state.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  constructor(private rootStateService:RootStateService) { }
  ngOnInit(): void {
    this.rootStateService.searchResponse$.subscribe(data => {
      console.log(data)
    })
  }
}
