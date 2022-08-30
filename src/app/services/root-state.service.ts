import { Results } from './../models/search.model';
import { QueryFilters } from '../enums/query-filters.enum';
import { Injectable } from '@angular/core';
import { first, map, Observable } from 'rxjs';
import { APICallState } from '../enums/api-call-state.enum';
import { SearchResponse } from '../models/search.model';
import { StateService } from '../store/global.store';
import { StackApiService } from './stack-api.service';
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
  constructor(private stackApiService: StackApiService, private router: Router) {
    super(initialState);
    // For setting PageSize
    this.pageSize$.subscribe(pageSize => {
      if (pageSize !== 0) {
        this.setPageSize(pageSize);
      }
    });

    // These  will run whenever the pageNumber changes.
    this.pageNumber$.pipe(distinctUntilChanged()
    ).subscribe(pageNumber => {
      // beacause pageNumber 1 is loaded by default
      if (pageNumber > 1) {
        // this.getSearchResults(pageNumber);
      }
    });

    // These  will run whenever the searchTerm changes.    
    this.searchTerm$
      .subscribe((searchTerm) => {
        if (searchTerm !== '') {
          this.getSearchResults()
        }
        else {
          console.log('searchTerm is empty')
        }
      })
  }

  private _searchTerm: string = this.state.searchState.searchTerm;
  private _pageSize: number = 0;
  private _PageNumber: number = 1;

  //Observables
  searchResponse$: Observable<SearchResponse> = this.select((state) => state.searchState.searchResponse);
  searchTerm$: Observable<string> = this.select((state) => state.searchState.searchTerm);
  currentQuery$: Observable<URLSearchParams> = this.select((state) => state.searchState.queryString);
  pageNumber$: Observable<number> = this.select((state) => state.searchState.searchResponse.page);
  pageSize$: Observable<number> = this.select((state) => state.searchState.searchResponse.page_size);


  getSearchResults(pageNumber?: number) {
    this.setState({ apiCallState: APICallState.LOADING });
    this.removeAllQueryFromQueryStringExcept(QueryFilters.PAGESIZE);
    this.QueryBuilder(QueryFilters.QUERY, this._searchTerm);
    if (pageNumber) {
      this.QueryBuilder(QueryFilters.PAGE, this.pageNumber);
    }
    else {
      this.QueryBuilder(QueryFilters.PAGE, this._PageNumber);
    }
    this.getResultsFromQueryString();
  }

  getAllQuestions(pageNumber?: number) {
    this.setState({ apiCallState: APICallState.LOADING });
    if (pageNumber) {
      this.QueryBuilder(QueryFilters.PAGE, this.pageNumber);
    }
    else {
      this.QueryBuilder(QueryFilters.PAGE, this._PageNumber);
    }
    this.QueryBuilder(QueryFilters.ORDER, 'desc');
    this.QueryBuilder(QueryFilters.SORT, 'votes');
    this.getResultsFromQueryString();
  }
  getTopQuestions(pageNumber?: number) {
    this.setState({ apiCallState: APICallState.LOADING });
    if (pageNumber) {
      this.QueryBuilder(QueryFilters.PAGE, this.pageNumber);
    }
    else {
      this.QueryBuilder(QueryFilters.PAGE, this._PageNumber);
    }
    this.QueryBuilder(QueryFilters.ORDER, 'desc');
    this.QueryBuilder(QueryFilters.SORT, 'creation');
    this.QueryBuilder(QueryFilters.ACCEPTED, 'False');
    this.QueryBuilder(QueryFilters.CLOSED, 'False');
    this.getResultsFromQueryString();
  }

  getResultsFromQueryString() {
    const queryString = this.state.searchState.queryString.toString();
    this.stackApiService.getResults(queryString)
     /*  .pipe(
        map((response: SearchResponse) => {
          this.setSearchResponseInState(response)
        }), first()).subscribe() */
  }

  setPageSize(pageSize: number) {
    this.QueryBuilder(QueryFilters.PAGESIZE, pageSize.toString());
  }
  setPageNumber(PageNumber: number) {
    this.QueryBuilder(QueryFilters.PAGE, PageNumber.toString());
  }

  //Set QueryString in State with updated searchTerm
  QueryBuilder(queryType: QueryFilters, value: string | number) {
    this.state.searchState.queryString.set(queryType, "" + value)
  }

  removeAllQueryFromQueryStringExcept(queryType: QueryFilters) {
    for (const [key, value] of this.state.searchState.queryString.entries()) {
      if (key !== queryType) {
        this.state.searchState.queryString.delete(key)
      }
    }
  }

  setSearchResponseInState(response: SearchResponse) {
    console.log(response)
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
