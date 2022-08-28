import { Component, Input, OnInit } from '@angular/core';
import { Results } from 'src/app/models/search.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input()
  props!: Results;

  constructor() { }

  ngOnInit(): void {
  }

}
