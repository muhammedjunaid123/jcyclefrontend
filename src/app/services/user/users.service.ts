import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { address, bicycle, brand, cart, category, filter, order, productDetails, rent, review, user, wishlist } from 'src/app/user/types/user.types';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private _http: HttpClient, private _router: Router) { }

  //this is user register api call
  userRegister(userData: any): Observable<user> {
    return this._http.post<user>(`/users/SignUp`, userData)
  }

  // this api call for user login
  userLogin(userData: any): any {
    return this._http.post(`/users/SignIn`, userData)

  }
  sendMail(id: string) {
    return this._http.get(`/users/otpVerification?id=${id}`)
  }
  loadHome(id: string) {
    return this._http.patch(`/users/verified?id=${id}`, {})
  }
  loadBicycle() {
    return this._http.get(`/product`)
  }
  loadBestSeller(): Observable<bicycle[]> {
    return this._http.get<bicycle[]>(`/product/BestSeller`)
  }
  addCart(id: string, price: number) {
    const user = localStorage.getItem(environment.UserSecret)
    return this._http.post(`/users/cart`, { id, user, price })
  }
  addWishlist(id: string) {
    const user = localStorage.getItem(environment.UserSecret)
    return this._http.post(`/users/wishlist`, { id, user })
  }
  loadwishlist(): Observable<wishlist> {
    const user = localStorage.getItem(environment.UserSecret)
    return this._http.get<wishlist>(`/users/wishlist?id=${user}`)
  }
  loadCart(): Observable<cart> {
    const user = localStorage.getItem(environment.UserSecret)
    return this._http.get<cart>(`/users/cart?id=${user}`)
  }
  removeCart(id: string, price: number, count: number) {
    const user = localStorage.getItem(environment.UserSecret)
    return this._http.patch(`/users/cart`, { id, user, price, count })
  }
  getBrand(): Observable<brand[]> {
    return this._http.get<brand[]>(`/product/brand`)

  }
  getCategory(): Observable<category[]> {
    return this._http.get<category[]>(`/product/category`)
  }
  filterProduct(filter: filter): Observable<bicycle[]> {
    const { brake_type, brand, category, gears, suspension } = filter

    return this._http.get<bicycle[]>(`/product/filter?brand=${brand}&brake_type=${brake_type}&category=${category}&gears=${gears}&suspension=${suspension}`)
  }
  productDetail(id: any): Observable<productDetails> {
    return this._http.get<productDetails>(`/product/productDetail?id=${id}`)
  }
  updateCart(count: number, id: string, price: number) {
    const user = localStorage.getItem(environment.UserSecret)
    console.log(price);

    return this._http.patch('/users/cartUpdate', { user, count, id, price })
  }
  orderProduct(orderDetails: any) {
    console.log(orderDetails);

    return this._http.post('/users/cheakout', orderDetails)
  }
  orderLoad(): Observable<order[]> {
    const user = localStorage.getItem(environment.UserSecret)
    return this._http.get<order[]>(`/users/order?id=${user}`)
  }
  changeStatus(user: string, orderID: string, value: string, Total: number) {
    return this._http.patch(`/users/orderStatus`, { user, orderID, value, Total })
  }
  loadWallet(): Observable<user> {
    const user = localStorage.getItem(environment.UserSecret)
    return this._http.get<user>(`/users/wallet?id=${user}`)
  }
  addReview(review: string, ratings: number, productID: string) {

    const user = localStorage.getItem(environment.UserSecret)
    return this._http.post(`/users/review`, { user, review, ratings, productID })
  }

  productReview(id: string): Observable<review> {
    return this._http.get<review>(`/users/review?id=${id}`)
  }
  userData(): Observable<user> {
    const user = localStorage.getItem(environment.UserSecret)
    return this._http.get<user>(`/users/userData?id=${user}`)
  }
  saveName(name: string) {
    const user = localStorage.getItem(environment.UserSecret)
    return this._http.post(`/users/updateName?id=${user}`, name)
  }

  addrent(data: FormData) {

    return this._http.post('/users/rent-add', data)
  }

  loadRentBicycle(): Observable<rent[]> {
    const user = localStorage.getItem(environment.UserSecret)
    return this._http.get<rent[]>(`/users/loadRentBicycle?id=${user}`)
  }
  addAddress(address: address): Observable<address> {
    const user = localStorage.getItem(environment.UserSecret)
    return this._http.post<address>(`/users/address`, {address,user})
  }
  loadAddress(){
    const user = localStorage.getItem(environment.UserSecret)
    return this._http.get(`/users/address?id=${user}`)
  }
}