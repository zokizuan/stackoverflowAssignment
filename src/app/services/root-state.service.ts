import { Results } from './../models/search.model';
import { QueryFilters } from '../enums/query-filters.enum';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APICallState } from '../enums/api-call-state.enum';
import { SearchResponse } from '../models/search.model';
import { StateService } from '../store/global.store';
import { SearchApiService } from './search-api.service';
import { distinctUntilChanged } from 'rxjs';
import { Router } from '@angular/router';


export interface RootState {
  searchState: {
    searchTerm: string;
    searchResponse: SearchResponse;
    queryString: URLSearchParams;
  };
  apiCallState: APICallState;
}
const initialState: RootState = {
  searchState: {
    searchTerm: '',
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
  },
  apiCallState: APICallState.NOTLOADED,
};

@Injectable({
  providedIn: 'root'
})
export class RootStateService extends StateService<RootState> {
  constructor(private searchApiService: SearchApiService, private router: Router) {
    super(initialState);
    /*
    * This will run whenever the searchTerm changes.
    * Using distinctUntilChanged to prevent multiple requests with same searchTerm.
     */
    this.pageSize$.subscribe(pageSize => {
      if (pageSize !== 0) {
        this.setPageSize(pageSize);
      }
    });
    this.pageNumber$.pipe(distinctUntilChanged()).subscribe(pageNumber => {
      if (pageNumber !== 0) {
        this.getPage(pageNumber);
      }
    });
    this.searchTerm$.pipe(
      distinctUntilChanged())
      .subscribe((searchTerm) => {
        if (searchTerm !== '') {
          this.router.navigate(['/search']),
            this.search()
        }
        else {
          console.log('searchTerm is empty')
        }
      })
  }

  private _searchTerm: string = this.state.searchState.searchTerm;
  private _pageSize: number = 0;
  private _PageNumber: number = 0;

  //Observables
  rootState$: Observable<RootState> = this.select((state) => state);
  searchResponse$: Observable<SearchResponse> = this.select((state) => state.searchState.searchResponse);
  items$: Observable<Results[]> = this.select((state) => state.searchState.searchResponse.items);
  searchTerm$: Observable<string> = this.select((state) => state.searchState.searchTerm);
  currentQuery$: Observable<URLSearchParams> = this.select((state) => state.searchState.queryString);
  pageNumber$: Observable<number> = this.select((state) => state.searchState.searchResponse.page);
  pageSize$: Observable<number> = this.select((state) => state.searchState.searchResponse.page_size);
  apiCallState$: Observable<APICallState> = this.select((state) => state.apiCallState);


  search() {
    this.setState({ apiCallState: APICallState.LOADING });
    this.QueryBuilder(QueryFilters.QUERY, this._searchTerm);
    this.searchApiService.getSearchResults(this.state.searchState.queryString.toString())
      .subscribe(
     (response: SearchResponse) => {
       this.setSearchResponseInState(response)
     }) 
  }

  setPageSize(pageSize: number) {
    this.QueryBuilder(QueryFilters.PAGESIZE, pageSize.toString());
  }

  getPage(pageNumber: number) {
    this.QueryBuilder(QueryFilters.PAGE, pageNumber.toString());
    this.searchApiService.getSearchResults(this.state.searchState.queryString.toString())
    .subscribe(
    (response: SearchResponse) => {
      this.setSearchResponseInState(response)
    }) 
  }

  //Set QueryString in State with updated searchTerm
  QueryBuilder(queryType: QueryFilters, value: string) {
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
  public get pageSize(): number {
    return this._pageSize;
  }
  public get pageNumber(): number {
    return this._PageNumber;
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

  public set pageSize(pageSize: number) {
    this._pageSize = pageSize;
    this.setState({
      ...this.state,
      searchState: {
        ...this.state.searchState,
        searchResponse: {
          ...this.state.searchState.searchResponse,
          page_size: pageSize
        }
      }
    });
  }

  public set pageNumber(pageNumber: number) {
    this._PageNumber = pageNumber;
    this.setState({
      ...this.state,
      searchState: {
        ...this.state.searchState,
        searchResponse: {
          ...this.state.searchState.searchResponse,
          page: pageNumber
        }
      }
    });
  }

}
