import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/user/users.service';
import {} from '../interFace.user'
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
 BestSeller:any=[]
 products!: any[] 
 constructor(private _userService:UsersService,
  private _toastr: ToastrService,private _router:Router){}
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
Addcart(id: string,price:number) {
  if(!localStorage.getItem(environment.UserSecret)){
    this._toastr.info('user not logged')
    this._router.navigate(['/login'])
  return
  }
  this._userService.addCart(id,price).subscribe({
    next: (res) => {
      this._toastr.success("added")
    },
    error: (error) => {
      this._toastr.info(error.error.message)

    }
  })
}
wishlist(id: string) {
  if(!localStorage.getItem(environment.UserSecret)){
    this._toastr.info('user not logged')
    this._router.navigate(['/login'])
  return
  }

  this._userService.addWishlist(id).subscribe({
    next: (res) => {
     this.refersh()

    },
    error: (error) => {
     
      this._toastr.info(error.error.message)

    }
  })
}


productDetails(id:string){
  this._router.navigate(['/bicycleDetail', { id: id }])
}


}
