import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RootStateService } from 'src/app/services/root-state.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})

export class QuestionsListComponent implements OnInit {
  itemsInPage = 10;
  constructor(public rootStateService: RootStateService, private route: ActivatedRoute) { }
  searchResponse$ = this.rootStateService.searchResponse$;
  searchTerm$ = this.rootStateService.searchTerm$;
  onPageChange(pageNumber: number) {
/*     this.rootStateService.pageNumber = pageNumber;
      switch (this.view) {
        case 'all-questions':
          this.rootStateService.getAllQuestions()   
          break;
        case 'top-questions':
          this.rootStateService.getTopQuestions()
          break;
        default:
          this.rootStateService.getSearchResults()
          break;
      } */
    }
  
  ngOnInit(): void {
    //Setting the page size to 10 initially
    this.rootStateService.pageSize = this.itemsInPage;
  }
}
