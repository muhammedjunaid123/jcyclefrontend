import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Router,  } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http:HttpClient,private _router: Router ) { }
  
 
  getProduct(){
    return this._http.get(`/admin/product`)
  }
  adminRegister(adminData:any){
    return this._http.post(`/admin/SignIn`,adminData)
   
  }
  productDetail(id:any){
    return this._http.get(`/product/productDetailAdmin?id=${id}`)
  }
  brandDetail(id:any){
    return this._http.get(`/product/brandDetails?id=${id}`)
  }
  categoryDetail(id:any){
    return this._http.get(`/product/categoryDetails?id=${id}`)
  }
  userDetail(id:string){
    console.log(id);
    
    return this._http.get(`/users/userDetails?id=${id}`)
  }
  getBrand(){
    return this._http.get(`/product/brand`)
  
  }
  getCategory(){
    return this._http.get(`/product/category`)
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

  getUsers(){
    return this._http.get(`/admin/users`)
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
   console.log(productVal);
   
    return this._http.patch(`/product/id?id=${id}`,productVal)
  }
}
