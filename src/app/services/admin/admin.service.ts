import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Router,  } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { bicycle, brand, user } from 'src/app/user/types/user.types';
import { adminBrand, adminCategory } from 'src/app/admin/types/admin.types';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http:HttpClient,private _router: Router ) { }
  
 
  getProduct():Observable<bicycle[]>{
    return this._http.get<bicycle[]>(`/admin/product`)
  }
  adminRegister(adminData:any){
    return this._http.post(`/admin/SignIn`,adminData)
   
  }
  productDetail(id:any):Observable<bicycle>{
    return this._http.get<bicycle>(`/product/productDetailAdmin?id=${id}`)
  }
  brandDetail(id:any){
    return this._http.get(`/product/brandDetails?id=${id}`)
  }
  categoryDetail(id:any){
    return this._http.get(`/product/categoryDetails?id=${id}`)
  }
  userDetail(id:string):Observable<user>{
    console.log(id);
    
    return this._http.get<user>(`/users/userDetails?id=${id}`)
  }
  getBrand():Observable<adminBrand[]>{
    return this._http.get<adminBrand[]>(`/product/brand`)
  
  }
  getCategory():Observable<adminCategory[]>{
    return this._http.get<adminCategory[]>(`/product/category`)
  }
  addCategory(category:any){
    return this._http.post(`/product/category`,{"name":category})
  }
  addBrand(brand:any){
    
    return this._http.post(`/product/brand`,{"name":brand})

  }
  addProduct(product:any){ 
  return this._http.post(`/product`,product)
  }

  getUsers():Observable<user[]>{
    return this._http.get<user[]>(`/admin/users`)
  }
  product_block(id:string,block_status:boolean){
    return this._http.patch(`/admin/productBlock?id=${id}`,{'isBlocked':block_status})
  }

  User_block(id:string,block_status:boolean){
    return this._http.patch(`/admin/userBlock?id=${id}`,{'isBlocked':block_status})
  }
  category_block(id:string,block_status:boolean){
    console.log(block_status);
    
    return this._http.patch(`/admin/categoryBlock?id=${id}`,{'isBlocked':block_status})
  }
  brand_block(id:string,block_status:boolean){
    console.log(block_status);
    
    return this._http.patch(`/admin/brandBlock?id=${id}`,{'isBlocked':block_status})
  }
  updateBrand(id:string,brandVal:string){
    return this._http.patch(`/product/brand/id?id=${id}`,{'name':brandVal})
  }
  updatecategory(id:string,categoryVal:string){
    return this._http.patch(`/product/category/id?id=${id}`,{'name':categoryVal})
  }
  updateProduct(id:string,productVal:any){
    return this._http.patch(`/product/id?id=${id}`,productVal)
  }
  imgDelete(index:number,id:string){
    console.log(index,id);
    
 return this._http.patch(`/product/imgDelete`,{index,id})
  }
}
