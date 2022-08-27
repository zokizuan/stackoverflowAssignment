import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SearchResponse } from '../models/search.model';

@Injectable({
  providedIn: 'root' 
})
export class SearchApiService {

  constructor(private httpService: HttpClient) { }
  getSearchResults(filters: string): Observable<SearchResponse> {
    const url = environment.apiURL + filters + environment.apiSite;
    console.log(url)
    return this.httpService
      .get<SearchResponse>(url)
      .pipe(catchError(this.processError));
  }
//TODO : this wont work on custom error scinarios need to fix it
  private processError(err: any) {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(() => {
      message;
    });
  }
}
