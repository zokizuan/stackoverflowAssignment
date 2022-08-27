import { Component, OnInit } from '@angular/core';
import { RootStateService } from 'src/app/services/root-state.service';
import { SearchApiService } from 'src/app/services/search-api.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  constructor(private rootStateService:RootStateService, private searchApiService:SearchApiService) { }
  ngOnInit(): void {
    this.rootStateService.searchResponse$.subscribe(data => {
      // console.log(data)
    })
    this.searchApiService.getStaticDataForDevelopment().subscribe(
      (data) => console.log(data)
    )
  }

}
