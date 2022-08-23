//
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenService } from '../Services/token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProdInterceptorService implements HttpInterceptor {
  

  constructor(
      private tokenService: TokenService,
      private router: Router,
            ) { }
    //////
  handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401) {
      this.tokenService.logOut();
      alert('La sesión ha expirado, por favor inicie sesión nuevamente.');
      this.router.navigateByUrl('/login');
      console.log("Error",err);
      
      
    }
    return throwError(err);
    //////
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let intReq = req;
    const token = this.tokenService.getToken();
    if (token != null) {
      intReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token)});
    }
    return next.handle(intReq).pipe(catchError((err) => this.handleAuthError(err))); /////////
  }
}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: ProdInterceptorService, multi: true}];


