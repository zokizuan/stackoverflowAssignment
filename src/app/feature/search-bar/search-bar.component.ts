import { RootStateService } from './../../services/root-state.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  filterPopup = false;
  searchControl = new FormControl();
  searchBarGroup = new FormGroup({SearchBar:this.searchControl});
  constructor(private rootStateService:RootStateService) { }

  onSubmit() {
    this.rootStateService.searchTerm = this.searchControl.value;
    this.filterPopup = false;
  }
  ngOnInit(): void {
    console.log(this.filterPopup)
  }
}
