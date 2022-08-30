import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from 'src/app/models/search.model';
import { RootStateService } from 'src/app/services/root-state.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})

export class QuestionsListComponent implements OnInit {
  itemsInPage = this.rootStateService.pageSize;
  constructor(public rootStateService: RootStateService) { }
  @Input() response$!: Observable<APIResponse>;
  ngOnInit(): void {
    console.log(this.itemsInPage)
  }
}
