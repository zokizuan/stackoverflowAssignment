import { ApiFilters } from './../enums/api-filters.enum';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APICallState } from '../enums/api-call-state.enum';
import { SearchResponse } from '../models/search.model';
import { StateService } from '../store/global.store';
import { SearchApiService } from './search-api.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

export interface RootState {
  searchState: {
    searchTerm: string;
    searchResponse: SearchResponse;
    query: string
  };
  apiCallState: APICallState;
}

const initialState: RootState = {
  searchState: {
    searchTerm: 'test',
    searchResponse: {
      items: [],
      has_more: false,
      quota_max: 0,
      quota_remaining: 0
    },
    query: ''
  },
  apiCallState: APICallState.NOTLOADED,
};

@Injectable({
  providedIn: 'root'
})
export class RootStateService extends StateService<RootState> {
  constructor(private searchApiService: SearchApiService) {
    super(initialState);
    //Using debounceTime to prevent multiple requests when user is typing
    this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(data => {
      this.searchQueryConstructor(data);
      this.search(this.state.searchState.query);
    })
  }
  private _searchTerm: string = this.state.searchState.searchTerm;
  rootState$: Observable<RootState> = this.select((state) => state);
  searchResponse$: Observable<SearchResponse> = this.select((state) => state.searchState.searchResponse);
  searchTerm$: Observable<string> = this.select((state) => state.searchState.searchTerm);
  apiCallState$: Observable<APICallState> = this.select((state) => state.apiCallState);
  private _currentQuery = this.state.searchState.query

  search(query: string) {
    this.setState({ apiCallState: APICallState.LOADING });
    console.log('searching for ' + query);
    this.searchApiService.getSearchResults(query)
  }

  searchQueryConstructor(searchTerm: string): string {
    const constructedQuery = ApiFilters.QUERY + searchTerm;
    this.setState({
      ...this.state,
      searchState: {
        ...this.state.searchState,
        query: `?${constructedQuery}`
      }
    });
    return `?${constructedQuery}`
  }

  getPage(pageNumber: number, pageSize?: number) {
    const page = ApiFilters.PAGE + pageNumber;
    const pagesize = ApiFilters.PAGESIZE + pageSize;

  }

  public get searchTerm(): string {
    return this._searchTerm;
  }
  public set searchTerm(latestSearchTerm: string) {
    this._searchTerm = latestSearchTerm;
    this.setState({
      ...this.state,
      searchState: {
        ...this.state.searchState,
        searchTerm: latestSearchTerm
      }
    });
  }

}
