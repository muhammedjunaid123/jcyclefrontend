import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/user/users.service';
import {HomeProduct } from '../types/user.types'
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,OnDestroy{
 BestSeller:any=[]
 products!: any[] 
 private subscribe: Subscription = new Subscription()
 constructor(private _userService:UsersService,
  private _toastr: ToastrService,private _router:Router){}
ngOnInit(): void {
  this.subscribe.add(
  this._userService.loadBestSeller().subscribe({
    
    next:(res)=>{
      console.log(res);
      
    this.BestSeller=res
    }
  })
  )
 
}
refersh(){
  this.subscribe.add(
  this._userService.loadBestSeller().subscribe({
    next:(res)=>{
      console.log(res);
      
    this.BestSeller=res
    }
  })
  )
}
Addcart(id: string,price:number) {
  if(!localStorage.getItem(environment.UserSecret)){
    this._toastr.info('user not logged')
    this._router.navigate(['/login'])
  return
  }
  this.subscribe.add(
  this._userService.addCart(id,price).subscribe({
    next: (res) => {
      this._toastr.success("added")
    },
    error: (error) => {
      this._toastr.info(error.error.message)

    }
  })
  )
}
wishlist(id: string) {
  if(!localStorage.getItem(environment.UserSecret)){
    this._toastr.info('user not logged')
    this._router.navigate(['/login'])
  return
  }
  this.subscribe.add(
  this._userService.addWishlist(id).subscribe({
    next: (res) => {
     this.refersh()

    },
    error: (error) => {
     
      this._toastr.info(error.error.message)

    }
  })
  )
}


productDetails(id:string){
  this._router.navigate(['/bicycleDetail', { id: id }])
}

ngOnDestroy(): void {
  this.subscribe.unsubscribe()
}
}
