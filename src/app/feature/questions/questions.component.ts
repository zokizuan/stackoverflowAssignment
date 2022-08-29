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
  searchResponse$=this.rootStateService.searchResponse$;
  items$:Observable<Results[]> = this.rootStateService.items$;
  searchTerm$ = this.rootStateService.searchTerm$;
  view$: Observable<string> = this.route.data.pipe(map(dataFromRouter => dataFromRouter?.['view']));
  total$ =this.rootStateService.searchResponse$.pipe(map(x=>x.total))
  itemsInPage = 10; 

  constructor(public rootStateService: RootStateService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //Setting the page size to 10 initially
    this.rootStateService.pageSize = this.itemsInPage;
  }

}
