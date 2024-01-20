import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { user } from 'src/app/user/types/user.types';

@Injectable({
  providedIn: 'root'
})
export class ServicerService {

  constructor(private _http: HttpClient, private _router: Router) { }

  servicerRegister(userData: any): Observable<user> {
    return this._http.post<user>(`/servicer/servicer`, userData)
  }
  sendMail(id: string) {
    return this._http.get(`/servicer/otpVerification?id=${id}`)
  }
  loadHome(id: string) {
    return this._http.patch(`/servicer/verified?id=${id}`, {})
  }
}
