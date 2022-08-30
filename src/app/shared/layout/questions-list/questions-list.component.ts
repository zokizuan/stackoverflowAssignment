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
  itemsInPage = 10;
  constructor(public rootStateService: RootStateService) { }
  @Input() response$!: Observable<APIResponse>;
  onPageChange(pageNumber: number) {
    this.rootStateService.pageNumber = pageNumber;
    }
  
  ngOnInit(): void {
    //Setting the page size to 10 initially
    console.log('setting page site')
    this.rootStateService.pageSize = this.itemsInPage;
  }
}
