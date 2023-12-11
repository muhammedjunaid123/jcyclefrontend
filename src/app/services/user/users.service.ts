import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private commonUrl = environment.APIuRL

  constructor(private _http: HttpClient, private _router: Router) { }

  //this is user register api call
  userRegister(userData: any): any {
    return this._http.post(`${this.commonUrl}/users/SignUp`, userData)
  }

  // this api call for user login
  userLogin(userData: any): any {
    return this._http.post(`${this.commonUrl}/users/SignIn`, userData)

  }
  sendMail(id: string) {
    return this._http.get(`${this.commonUrl}/users/otpVerification?id=${id}`)
  }
  loadHome(){
   this._router.navigate([''])
  }
  loadBicycle(){
    return this._http.get(`${this.commonUrl}/product`)
  } 
}
