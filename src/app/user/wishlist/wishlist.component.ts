import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/user/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent  implements OnInit{
  BestSeller:any=[]

  constructor(private _userService:UsersService,
    private _toastr: ToastrService ){}
 ngOnInit(): void {
   this._userService.loadwishlist().subscribe({
     next:(res)=>{
     this.BestSeller=res
     this.BestSeller= this.BestSeller['product']
     console.log(this.BestSeller);
     
     
     }
   })
 }
 refersh(){
  this._userService.loadwishlist().subscribe({
    next:(res)=>{
    this.BestSeller=res
    this.BestSeller= this.BestSeller['product']
    console.log(this.BestSeller);
    
    
    }
  })
 }
 Addcart(id:string){ 
  this._userService.addCart(id).subscribe({
    next:(res)=>{
    this._toastr.success("added")
      
    },
    error:(error)=>{
      this._toastr.info(error.error.message)
       
    }
  })
 }
 wishlist(id:string){
  console.log(id);
  
this._userService.addWishlist(id).subscribe({
  next:(res)=>{
    this.refersh()  
  },
  error:(error)=>{
    this._toastr.info(error.error.message)
  }
})
 }
} 
