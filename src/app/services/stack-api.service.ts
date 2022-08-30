import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SearchResponse } from '../models/search.model';

@Injectable({
  providedIn: 'root' 
})
export class StackApiService {

  constructor(private httpService: HttpClient) { }
  getResults(queries: string) {
    const url = environment.apiEndpoint + '?' + queries + environment.apiFilter;
    console.log(url)
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
