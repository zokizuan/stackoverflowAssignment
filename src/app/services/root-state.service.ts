import { Utility } from './../shared/utility';
import { ApiFilters } from './../enums/api-filters.enum';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APICallState } from '../enums/api-call-state.enum';
import { SearchResponse } from '../models/search.model';
import { StateService } from '../store/global.store';
import { SearchApiService } from './search-api.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { API_Query_Filters } from '../models/api-filters.model';


export interface RootState {
  searchState: {
    searchTerm: string;
    searchResponse: SearchResponse;
    queryString: string;
    queries: API_Query_Filters;
  };
  apiCallState: APICallState;
}
const initialQueries: API_Query_Filters = Utility.enumToObject(ApiFilters) as unknown as API_Query_Filters;
const initialState: RootState = {
  searchState: {
    searchTerm: 'test',
    searchResponse: {
      items: [],
      has_more: false,
      quota_max: 0,
      quota_remaining: 0
    },
    queryString: '',
    queries: initialQueries
  },
  apiCallState: APICallState.NOTLOADED,
};

@Injectable({
  providedIn: 'root'
})
export class RootStateService extends StateService<RootState> {
  constructor(private searchApiService: SearchApiService) {
    super(initialState);
    console.log(this._searchTerm)
    //set private variable currentQuery to the current query in the state
    this.currentQuery$.subscribe(queries => this._currentQuery = queries);
    this.queriesObject$.subscribe(queries => this._queriesObject = queries);
    //Using debounceTime to prevent multiple requests when user is typing
    this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((searchTerm)=>this.search(searchTerm))
  }
  private _searchTerm: string = this.state.searchState.searchTerm;
  rootState$: Observable<RootState> = this.select((state) => state);
  searchResponse$: Observable<SearchResponse> = this.select((state) => state.searchState.searchResponse);
  searchTerm$: Observable<string> = this.select((state) => state.searchState.searchTerm);
  currentQuery$: Observable<string> = this.select((state) => state.searchState.queryString);
  queriesObject$: Observable<API_Query_Filters> = this.select((state) => state.searchState.queries);
  apiCallState$: Observable<APICallState> = this.select((state) => state.apiCallState);

  private _currentQuery!: string;
  private _queriesObject!: API_Query_Filters;

  search(searchTerm:string) {
    this.setState({ apiCallState: APICallState.LOADING });
    this.searchQueryConstructor(this._searchTerm);
    this.PageAndPageSizeQueryConstructor('1', '2');
    this.resetQueriesObject();
    this.searchApiService.getSearchResults(this.state.searchState.queryString)
  }

  searchQueryConstructor(searchTerm: string) {
    this.setQueriesInState('query', searchTerm);
    const constructedSearchQuery = '?' + ApiFilters.QUERY + this._queriesObject.query
    this.setQueryStringInState(constructedSearchQuery)
  }

  PageAndPageSizeQueryConstructor(pageNumber: string, pageSize?: string) {
    this.setQueriesInState('page', pageNumber);
    if (pageSize !== undefined) {
      this.setQueriesInState('pagesize', pageSize);
    }
    const page = '&' + ApiFilters.PAGE + this._queriesObject.page
    const pageSizeParam = this._queriesObject.pagesize !== '' ? '&' + ApiFilters.PAGESIZE + this._queriesObject.pagesize  : '';
    const constructedPageAndPageSizeQuery = `${page}${pageSizeParam}`;
    this.setQueryStringInState(this._currentQuery+constructedPageAndPageSizeQuery)
  }

  setQueriesInState(key: keyof API_Query_Filters, value: string) {
    this.setState({
      ...this.state,
      searchState: {
        ...this.state.searchState,
        queries: {
          ...this.state.searchState.queries,
          [key]: value
        }
      }
    })
  }

  setQueryStringInState(queryString: string) {
    this.setState({
      ...this.state,
      searchState: {
        ...this.state.searchState,
        queryString: queryString        
      }
    })
  }

  resetQueriesObject() {
    this.setState({
      ...this.state,
      searchState: {
        ...this.state.searchState,
        queries: initialQueries
      }
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
