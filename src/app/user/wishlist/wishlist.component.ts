import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/user/users.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent  implements OnInit,OnDestroy{
  BestSeller:any=[]
   i=0
   private subscribe: Subscription = new Subscription()
  constructor(private _userService:UsersService,
    private _toastr: ToastrService ){}
 ngOnInit(): void {
  this.subscribe.add(
   this._userService.loadwishlist().subscribe({
     next:(res)=>{
     this.BestSeller=res
     this.BestSeller= this.BestSeller['product']
     console.log(this.BestSeller);
     
     
     }
   })
  )
 }
 refersh(){
  this.subscribe.add(
  this._userService.loadwishlist().subscribe({
    next:(res)=>{
    this.BestSeller=res
    this.BestSeller= this.BestSeller['product']
    console.log(this.BestSeller);
    
    
    }
  })
  )
 }
 Addcart(id:string,price:number){ 
  this.subscribe.add(
  this._userService.addCart(id,price).subscribe({
    next:(res)=>{
    this._toastr.success("added")
      
    },
    error:(error)=>{
      this._toastr.info(error.error.message)
       
    }
  })
  )
 }
 wishlist(id:string){
  console.log(id);
  this.subscribe.add(
this._userService.addWishlist(id).subscribe({
  next:(res)=>{
    this.refersh()  
  },
  error:(error)=>{
    this._toastr.info(error.error.message)
  }
})
  )
 }
 ngOnDestroy(): void {
   this.subscribe.unsubscribe()
 }
} 
