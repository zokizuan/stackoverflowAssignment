import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { RootStateService } from 'src/app/services/root-state.service';
import { APIResponse } from 'src/app/models/search.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private rootStateService:RootStateService) { }
  response$!: Observable<APIResponse>
  ngOnInit(): void {
    this.rootStateService.getTopQuestions();
    this.response$ = this.rootStateService.response$
  }

}
