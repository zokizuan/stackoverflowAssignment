import { Utility } from './../shared/utility';
import { QueryFilters } from '../enums/query-filters.enum';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { APICallState } from '../enums/api-call-state.enum';
import { SearchResponse } from '../models/search.model';
import { StateService } from '../store/global.store';
import { SearchApiService } from './search-api.service';
import { distinctUntilChanged } from 'rxjs';
import { API_Query_Filters } from '../models/api-filters.model';
import { Router } from '@angular/router';


export interface RootState {
  searchState: {
    searchTerm: string;
    searchResponse: SearchResponse;
    queryString: URLSearchParams;
    // queries: API_Query_Filters;
  };
  apiCallState: APICallState;
}
//Change Enum QueryFilter to generate Filters Object which whill hold the Values for Api Call
// const initialQueries: API_Query_Filters = Utility.enumToObject(QueryFilters) as unknown as API_Query_Filters;

const initialState: RootState = {
  searchState: {
    searchTerm: 'test',
    searchResponse: {
      items: [],
      has_more: false,
      quota_max: 0,
      quota_remaining: 0,
      page: 0,
      page_size: 0,
      total: 0
    },
    queryString: (new URLSearchParams()),
    // queries: initialQueries
  },
  apiCallState: APICallState.NOTLOADED,
};

@Injectable({
  providedIn: 'root'
})
export class RootStateService extends StateService<RootState> {
  constructor(private searchApiService: SearchApiService, private router: Router) {
    super(initialState);
    //Using debounceTime to prevent multiple requests when user is typing
    this.searchTerm$.pipe(
      distinctUntilChanged())
      .subscribe((searchTerm) => {
        if (searchTerm !== '') {
          this.router.navigate(['/search']),
            this.search(searchTerm)
        }
        else {
          console.log('searchTerm is empty')
        }
      })
  }

  private _searchTerm: string = this.state.searchState.searchTerm;

  //Observables
  rootState$: Observable<RootState> = this.select((state) => state);
  searchResponse$: Observable<SearchResponse> = this.select((state) => state.searchState.searchResponse);
  searchTerm$: Observable<string> = this.select((state) => state.searchState.searchTerm);
  currentQuery$: Observable<URLSearchParams> = this.select((state) => state.searchState.queryString);
  apiCallState$: Observable<APICallState> = this.select((state) => state.apiCallState);


  search(searchTerm: string) {
    this.setState({ apiCallState: APICallState.LOADING });
    this.QueryConstructor(QueryFilters.QUERY, this._searchTerm);
    this.searchApiService.getSearchResults(this.state.searchState.queryString.toString()).subscribe(
      (response: SearchResponse) => {
        this.setSearchResponseInState(response)
      })
  }

  getPageAndPageSize(pageNumber: number, pageSize?: number) {
    this.QueryConstructor(QueryFilters.PAGE, pageNumber.toString());
    if (pageSize !== undefined) {
      this.QueryConstructor(QueryFilters.PAGESIZE, pageSize.toString());
    }
    this.searchApiService.getSearchResults(this.state.searchState.queryString.toString()).subscribe(
      (response: SearchResponse) => {
        this.setSearchResponseInState(response)
      })
  }

  //Set QueryString in State with updated searchTerm
  QueryConstructor(queryType: QueryFilters, value: string) {
    this.state.searchState.queryString.set(queryType, value)
  }

  setSearchResponseInState(response: SearchResponse) {
    this.setState({
      searchState: {
        ...this.state.searchState,
        searchResponse: response
      },
      apiCallState: APICallState.LOADED
    });
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
