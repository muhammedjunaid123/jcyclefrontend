import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  

  constructor(private _http: HttpClient, private _router: Router) { }

  //this is user register api call
  userRegister(userData: any): any {
    return this._http.post(`/users/SignUp`, userData)
  }

  // this api call for user login
  userLogin(userData: any): any {
    return this._http.post(`/users/SignIn`, userData)

  }
  sendMail(id: string) {
    return this._http.get(`/users/otpVerification?id=${id}`)
  }
  loadHome(id:string){
   return this._http.patch(`/users/verified?id=${id}`,{})
  }
  loadBicycle(){
    return this._http.get(`/product`)
  } 
  loadBestSeller(){
    return this._http.get(`/product/BestSeller`)
  }
  addCart(id:string,price:number){
const user=localStorage.getItem(environment.UserSecret)
    return this._http.post(`/users/cart`,{id,user,price})
  }
  addWishlist(id:string){
    const user=localStorage.getItem(environment.UserSecret)
    return this._http.post(`/users/wishlist`,{id,user})
  }
  loadwishlist(){
    const user=localStorage.getItem(environment.UserSecret)
    return this._http.get(`/users/wishlist?id=${user}`)
  }
  loadCart(){
    const user=localStorage.getItem(environment.UserSecret)
    return this._http.get(`/users/cart?id=${user}`)
  }
  removeCart(id:string,price:number,count:number){
    const user=localStorage.getItem(environment.UserSecret)
    return this._http.patch(`/users/cart`,{id,user,price,count})
  }
  getBrand(){
    return this._http.get(`/product/brand`)
  
  }
  getCategory(){
    return this._http.get(`/product/category`)
  }
  filterProduct(value:any){
    return this._http.post(`/product/filter`,value)
  }
  productDetail(id:any){
    return this._http.get(`/product/productDetail?id=${id}`)
  }
    updateCart(count:number,id:string,price:number){
    const user=localStorage.getItem(environment.UserSecret)
    console.log(price);
    
  return this._http.patch('/users/cartUpdate',{user,count,id,price})
  }
}
