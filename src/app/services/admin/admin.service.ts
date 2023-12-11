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
  
  private commonUrl = environment.APIuRL
  getProduct(){
    return this._http.get(`${this.commonUrl}/product`)
  }
  adminRegister(adminData:any){
    return this._http.post(`${this.commonUrl}/admin/SignIn`,adminData)
   
  }
  productDetail(id:any){
    return this._http.get(`${this.commonUrl}/product/productDetail?id=${id}`)
  }
  brandDetail(id:any){
    return this._http.get(`${this.commonUrl}/product/brandDetails?id=${id}`)
  }
  categoryDetail(id:any){
    return this._http.get(`${this.commonUrl}/product/categoryDetails?id=${id}`)
  }
  userDetail(id:string){
    console.log(id);
    
    return this._http.get(`${this.commonUrl}/users/userDetails?id=${id}`)
  }
  getBrand(){
    return this._http.get(`${this.commonUrl}/product/brand`)
  
  }
  getCategory(){
    return this._http.get(`${this.commonUrl}/product/category`)
  }
  addCategory(category:any){
    return this._http.post(`${this.commonUrl}/product/category`,{"name":category})
  }
  addBrand(brand:any){
    
    return this._http.post(`${this.commonUrl}/product/brand`,{"name":brand})

  }
  addProduct(product:any){
 
  return this._http.post(`${this.commonUrl}/product`,product)
  }

  getUsers(){
    return this._http.get(`${this.commonUrl}/admin/users`)
  }
  product_block(id:string,block_status:boolean){
    return this._http.patch(`${this.commonUrl}/admin/productBlock?id=${id}`,{'isBlocked':block_status})
  }

  User_block(id:string,block_status:boolean){
    return this._http.patch(`${this.commonUrl}/admin/userBlock?id=${id}`,{'isBlocked':block_status})
  }
  category_block(id:string,block_status:boolean){
    console.log(block_status);
    
    return this._http.patch(`${this.commonUrl}/admin/categoryBlock?id=${id}`,{'isBlocked':block_status})
  }
  brand_block(id:string,block_status:boolean){
    console.log(block_status);
    
    return this._http.patch(`${this.commonUrl}/admin/brandBlock?id=${id}`,{'isBlocked':block_status})
  }
  updateBrand(id:string,brandVal:string){
    return this._http.patch(`${this.commonUrl}/product/brand/id?id=${id}`,{'name':brandVal})
  }
  updatecategory(id:string,categoryVal:string){
    return this._http.patch(`${this.commonUrl}/product/category/id?id=${id}`,{'name':categoryVal})
  }
  updateProduct(id:string,productVal:any){
    return this._http.patch(`${this.commonUrl}/product/id?id=${id}`,productVal)
  }
}
