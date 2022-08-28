import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() props:any = '';

  constructor() { }

  ngOnInit(): void {
    console.log(this.props)
  }

}
