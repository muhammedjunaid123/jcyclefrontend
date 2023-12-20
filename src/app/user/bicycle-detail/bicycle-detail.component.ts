import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/user/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bicycle-detail',
  templateUrl: './bicycle-detail.component.html',
  styleUrl: './bicycle-detail.component.css'
})
export class BicycleDetailComponent implements OnInit {
  product:any=[]
  constructor(private _route: ActivatedRoute,private _userService:UsersService, private _toastr: ToastrService,private _router:Router){}
ngOnInit(): void {
  this._route.params.subscribe(params => {
    this._userService.productDetail(params['id']).subscribe({
      next: (res) => {
        this.product = res
        console.log(this.product);
        
      }
    })
  });
}
refersh(){
  this._route.params.subscribe(params => {
    this._userService.productDetail(params['id']).subscribe({
      next: (res) => {
        this.product = res
        console.log(this.product);
        
      }
    })
  });
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
}
