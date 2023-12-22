import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/user/users.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({

  templateUrl: './bicycle.component.html',
  styleUrl: './bicycle.component.css'
})
export class BicycleComponent implements OnInit {
  product: any = []
  brand: any = []
  category: any = []
  productForm!:FormGroup
  pSize=6
  currentPage=1
  constructor(private _userService: UsersService,
    private _toastr: ToastrService,private _fb:FormBuilder,
    private _router:Router
        ) { }
  ngOnInit(): void {

    this.productForm = this._fb.group({
      brand: ['', Validators.required],
      category: ['', Validators.required],
      gears: ['', Validators.required],
      brake_type: ['', Validators.required],
      suspension: ['', Validators.required]
    })


    this._userService.loadBicycle()
      .subscribe({
        next: (res: any) => {
          this.product = res
        },
        error: (Error) => {
          console.log(Error);

        }
      })

      this._userService.getBrand().subscribe({
        next: (res) => {
          this.brand = res
        }
      })
      this._userService.getCategory().subscribe({
        next: (res) => {
          this.category = res
        }
      })
  

  }
  refersh(){
    this._userService.loadBicycle()
    .subscribe({
      next: (res: any) => {
        this.product = res
      },
      error: (Error) => {
        console.log(Error);

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
  filter(){
    console.log(this.productForm.getRawValue());
    
    this._userService.filterProduct(this.productForm.getRawValue())
    .subscribe({
      next:(res)=>{
        this.product=res
      },
      error:(error)=>{
  console.log(error
    );
  
      }
    })
  }
  productDetails(id:string){
    this._router.navigate(['/bicycleDetail', { id: id }])
  }
}


