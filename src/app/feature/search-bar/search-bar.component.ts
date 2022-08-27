import { RootStateService } from './../../services/root-state.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {


  searchControl = new FormControl();
  constructor(private rootStateService:RootStateService) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe().subscribe(data => {
      this.rootStateService.searchTerm = data;
    });
  }
}
