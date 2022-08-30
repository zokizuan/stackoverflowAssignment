import { Component, OnInit } from '@angular/core';
import { RootStateService } from 'src/app/services/root-state.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private rootStateService: RootStateService) { }
  searchResponse$ = this.rootStateService.searchResponse$;
  searchTerm$ = this.rootStateService.searchTerm$;
  ngOnInit(): void {
  }

}
