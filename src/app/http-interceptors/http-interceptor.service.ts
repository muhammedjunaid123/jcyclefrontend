import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ErrorHandleService } from '../services/error/error-handle.service';



@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private _spinner: NgxSpinnerService,private _errorHandlerService: ErrorHandleService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('hit');
    
    this._spinner.show();
    const userToken = localStorage.getItem(environment.UserSecret);
    const servicerToken = localStorage.getItem(environment.servicerSecret);
    const adminToken = localStorage.getItem(environment.AdminSecrect);
    let newRequest =req
    let validToken:any
    if(userToken){
       validToken=userToken
    }else{
      validToken=servicerToken?servicerToken:adminToken
    }
    newRequest=newRequest.clone({
  headers:newRequest.headers.set('Authorization', 'Bearer ' + validToken),
      url: environment.APIuRL + req.url
    })
    return next.handle(newRequest).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this._spinner.hide();
        }
      }),
     
      catchError((error: HttpErrorResponse) => {        
        this._spinner.hide();       
        this._errorHandlerService.handleError(error);
        return throwError(() => error);
      })
    );
    
  }
}
