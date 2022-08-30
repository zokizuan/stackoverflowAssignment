import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RootStateService } from 'src/app/services/root-state.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})

export class QuestionsComponent implements OnInit {
  itemsInPage = 10;
  constructor(public rootStateService: RootStateService, private route: ActivatedRoute) { }
  view!: string;
  searchResponse$ = this.rootStateService.searchResponse$;
  searchTerm$ = this.rootStateService.searchTerm$;
  view$: Observable<string> = this.route.data.pipe(map(dataFromRouter => {
    this.view = dataFromRouter?.['view']
    return dataFromRouter?.['view']
  }));
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
    this.view$.subscribe(x => {
      // console.log(x)
      if (x === 'all-questions') {
        this.rootStateService.getAllQuestions()
      }
      else if (x === 'top-questions') {
        this.rootStateService.getTopQuestions()
      }
    })
  }
}
