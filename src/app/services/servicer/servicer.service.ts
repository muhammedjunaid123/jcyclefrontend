import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { service } from 'src/app/servicer/types/servicer.types';
import { user } from 'src/app/user/types/user.types';
import { environment } from 'src/environments/environment.development';

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
  getLocation() {
    return this._http.get('/users/location')
  }
  addService(data: any) {
    let servicer = localStorage.getItem(environment.servicerSecret)
    return this._http.post('/servicer/addService', { data, servicer })
  }
  userLogin(data: any) {
    return this._http.post('/servicer/login', data)
  }
  getservice(): Observable<service[]> {
    const user = localStorage.getItem(environment.servicerSecret)
    return this._http.get<service[]>(`/servicer/Service?id=${user}`)
  }
  blockService(id:string,isBlocked:boolean){
    return this._http.patch('/servicer/blockService',{id,isBlocked})
  }
  getServiceById(id:string):Observable<service>{
    return this._http.get<service>(`/servicer/getServiceById?id=${id}`)
  }
  editService(id:string,data:service){
  return this._http.patch('/servicer/editService',{id,data})
  }
  getUserserviceHistory(){
    const user = localStorage.getItem(environment.servicerSecret)
    return this._http.get(`/servicer/getUserserviceHistory?id=${user}`)
  }
  serviceOrderCancel(itemId:string,userId:string,price:number){
 return this._http.patch(`/servicer/serviceOrderCancel`,{itemId,userId,price})
  }
  getRecentUsers(): Observable<any> {
    return this._http.get('/servicer/getRecentUsers')
  }
  getRecentChats(id: string): Observable<any> {
    return this._http.get(`/servicer/getRecentChats?id=${id}`)
  }
  getMyDetails(): Observable<any> {
   
    return this._http.get('/servicer/getMyDetails')
  }
  saveName(name: string) {
    const servicer = localStorage.getItem(environment.servicerSecret)
    return this._http.post(`/servicer/updateName?id=${servicer}`, name)
  }
  ServicerData(){
    const servicer =localStorage.getItem(environment.servicerSecret)
    return this._http.get(`/servicer/ServicerData?id=${servicer}`)
  }
  dashboard(){
    const servicer =localStorage.getItem(environment.servicerSecret)
     return this._http.get(`/servicer/dashboard?id=${servicer}`)
  }
}
