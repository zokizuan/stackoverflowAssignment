import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from 'src/app/models/search.model';
import { RootStateService } from 'src/app/services/root-state.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerm$ = this.rootStateService.searchTerm$;
  response$!: Observable<APIResponse>
  constructor(private rootStateService: RootStateService) { }
  activeSplit= "";
  sortBy(value: string, orderType?: string,e?:Event) {
    if (orderType) {
      this.rootStateService.setSortBy(value, orderType);
    }
    else {
      this.rootStateService.setSortBy(value);
    }
    this.activeSplit = (e?.currentTarget as HTMLInputElement).id; 
  }
  ngOnInit(): void {
    this.rootStateService.getSearchResults();
    this.response$ = this.rootStateService.response$
  }
}
