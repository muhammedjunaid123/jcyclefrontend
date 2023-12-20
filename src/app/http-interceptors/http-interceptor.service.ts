import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
 

     
    return next.handle(newRequest)
  }
}
