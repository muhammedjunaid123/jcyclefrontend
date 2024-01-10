import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { adminBrand } from '../types/admin.types';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent implements OnInit,OnDestroy {
  brand!: adminBrand[]
  pagesize = 6
  currentPage = 1
  private subscribe: Subscription = new Subscription()
  constructor(private _adminservice: AdminService,private _Router:Router,private _toastr :ToastrService ) {

  }
  ngOnInit(): void {
    this.subscribe.add(
    this._adminservice.getBrand().subscribe({
      next: (res:adminBrand[]) => {
        this.brand = res
      },
      error: (error) => {
        console.log(error.error.message);

      }

    })
    )

    console.log(this.brand);

  }
  
  refersh(){
    this.subscribe.add(
    this._adminservice.getBrand().subscribe({
      next: (res:adminBrand[]) => {
        this.brand = res
      },
      error: (error) => {
        console.log(error.error.message);

      }

    })
    )
  }
  addBrand(brandval:any){
    console.log(brandval);
    this.subscribe.add(
      this._adminservice.addBrand(brandval).subscribe({
        next:(res)=>{
         this.refersh()
        },
        error:(err)=>{
          this._toastr.error(err.error.message)
        }
      })
    )
  }
  editBrand(brand:any){
 this._Router.navigate(['/admin/brandUpdate',{id:brand}])
  }

  block_or_unblock(id:string,brandBlockStatus:boolean){
  
    if(brandBlockStatus===true){
      
      this.subscribe.add(
      this._adminservice.brand_block(id,false).subscribe({
        next:()=>{
          this.refersh()
        },
        error:(err:Error)=>{
          console.log(err);
          
        }
      })
      )
    }else{
      this.subscribe.add(
      this._adminservice.brand_block(id,true).subscribe({
        next:()=>{
          this.refersh()
        },
        error:(err:Error)=>{
          console.log(err);
          
        }
      })
      )
    }
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
