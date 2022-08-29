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
  
  searchResponse$ = this.rootStateService.searchResponse$;
  searchTerm$ = this.rootStateService.searchTerm$;
  view$: Observable<string> = this.route.data.pipe(map(dataFromRouter => dataFromRouter?.['view']));
  
  ngOnInit(): void {
    //Setting the page size to 10 initially
    this.rootStateService.pageSize = this.itemsInPage;
  }

}
