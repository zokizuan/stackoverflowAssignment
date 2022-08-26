import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SpinnerService } from '../shared/spinner/service/spinner.service';

@Injectable()
export class GlobalSpinnerInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerService.requestStarted();
    return this.handler(next, request);
  }
  handler(next: HttpHandler, request: HttpRequest<any>) {
    return next.handle(request)
      .pipe(tap({
        next: x => {
          if (x instanceof HttpResponse) {
            setTimeout(() => {
              this.spinnerService.requestEnded();
             }, 300);

          }
        },
        error: err => {
          this.spinnerService.resetSpinner();
          console.error(err);
          throw err;
        },
      }));
  }
}
