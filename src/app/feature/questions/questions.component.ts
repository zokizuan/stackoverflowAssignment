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
  test!:number;
  testting!: Results[];
  searchTerm = this.rootStateService.searchTerm$;
  view$: Observable<string> = this.route.data.pipe(map(dataFromRouter => dataFromRouter?.['view']));

  constructor(private rootStateService: RootStateService, private searchApiService: SearchApiService,private route:ActivatedRoute) { }
  ngOnInit(): void {
    this.view$.subscribe(data => {
      console.log(data)
    })
    this.rootStateService.searchResponse$.subscribe(data => {
      this.testting = data.items;
      this.test = data.total
      console.log(data)
    })
  }

}
