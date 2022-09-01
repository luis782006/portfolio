import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HTTP_INTERCEPTORS,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable, tap } from 'rxjs';
  import { SpinnerServiceService } from '../Services/spinner-service.service';

  
  @Injectable()
  export class SpinnerInterceptor implements HttpInterceptor {
    constructor(  private spinnerService:SpinnerServiceService,) {}
  
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      this.spinnerService.requestStarted();
      return this.handler(next, req);
    }
  
    handler(next: any, req: any) {
      return next.handle(req).pipe(
        tap(
          (event) => {
            if (event instanceof HttpResponse) {
              this.spinnerService.resetSpinner();
            }
          },
          (error: HttpErrorResponse) => {
            this.spinnerService.resetSpinner();
            throw error;
          }
        )
      );
    }
  }
  
  export const spinnerInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  ];