import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { SearchResponse,Results } from 'src/app/models/search.model';
import { RootStateService } from 'src/app/services/root-state.service';
import { SearchApiService } from 'src/app/services/search-api.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})

export class QuestionsComponent implements OnInit {
  searchResponse!: SearchResponse;
  p: number = 1;
  collection!: any[];  
  items!: Results[];
  searchTerm = this.rootStateService.searchTerm$;
  view$: Observable<string> = this.route.data.pipe(map(dataFromRouter => dataFromRouter?.['view']));
  ItemsInPage!: number; 
  pageNumber!: number;
  totalItems!: number;

  constructor(private rootStateService: RootStateService, private searchApiService: SearchApiService, private route: ActivatedRoute) { }
  handlePageChange(event: any) {
    this.pageNumber = event;
    this.rootStateService.getPageAndPageSize(this.pageNumber);
    console.log(event)
  }
  ngOnInit(): void {
    this.view$.subscribe(data => {
      console.log(data)
    })
    this.rootStateService.searchResponse$.subscribe(data => {
      this.items = data.items;
      this.searchResponse = data;
      this.ItemsInPage = data.page_size;
      this.pageNumber = data.page;
      this.totalItems = data.total;
      console.log(data)
    })
  }

}
