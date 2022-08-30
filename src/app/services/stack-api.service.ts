import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { APIResponse } from '../models/search.model';

@Injectable({
  providedIn: 'root' 
})
export class StackApiService {

  constructor(private httpService: HttpClient) { }
  getResults(queries: string): Observable<APIResponse> {
    const url = environment.apiEndpoint + '?' + queries + environment.apiFilter;
    console.log(url)
    return this.httpService
      .get<APIResponse>(url)
      .pipe(catchError(this.processError));
  }
  
  private processError(err: { error: { message: string; }; status: any; message: any; }) {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error: ${err.message}`;
    }
    // console.log(message);
    return throwError(() => {
      message;
    });
  }
}
