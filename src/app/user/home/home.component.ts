import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/user/users.service';
import {} from '../interFace.user'
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
 BestSeller:any=[]
 products!: any[] 
 constructor(private _userService:UsersService,
  private _toastr: ToastrService){}
ngOnInit(): void {
  
  this._userService.loadBestSeller().subscribe({
    
    next:(res)=>{
      console.log(res);
      
    this.BestSeller=res
    }
  })
  this.products=['../../../assets/anime-girls-cyclist-cycling-mountains-sport-hd-wallpaper-preview.jpg','../../../assets/anime-girls-cyclist-cycling-mountains-sport-hd-wallpaper-preview.jpg','../../../assets/anime-girls-cyclist-cycling-mountains-sport-hd-wallpaper-preview.jpg']
}
refersh(){
  this._userService.loadBestSeller().subscribe({
    next:(res)=>{
      console.log(res);
      
    this.BestSeller=res
    }
  })
}
Addcart(id: string) {
  this._userService.addCart(id).subscribe({
    next: (res) => {
      this._toastr.success("added")
    },
    error: (error) => {
      this._toastr.info(error.error.message)

    }
  })
}
wishlist(id: string) {

  this._userService.addWishlist(id).subscribe({
    next: (res) => {
     this.refersh()

    },
    error: (error) => {
     
      this._toastr.info(error.error.message)

    }
  })
}





}
