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
  @Input() response$!: Observable<APIResponse>;
  constructor(public rootStateService: RootStateService) { }
  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
    });
  }
  ngOnInit(): void {
  }
}
