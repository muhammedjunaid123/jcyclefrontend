import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/user/users.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { wishProduct, wishlist } from '../types/user.types';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent  implements OnInit,OnDestroy{
  wishProduct!:wishProduct[]
   i=0
   private subscribe: Subscription = new Subscription()
  constructor(private _userService:UsersService,
    private _toastr: ToastrService ){}
 ngOnInit(): void {
  this.subscribe.add(
   this._userService.loadwishlist().subscribe({
     next:(res:wishlist)=>{
     this.wishProduct=res['product']
     console.log(this.wishProduct);
     
     
     }
   })
  )
 }
 refersh(){
  this.subscribe.add(
  this._userService.loadwishlist().subscribe({
    next:(res:wishlist)=>{
      this.wishProduct=res['product']
      console.log(this.wishProduct);
      
      
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
 
})
  )
 }
 ngOnDestroy(): void {
   this.subscribe.unsubscribe()
 }
} 
