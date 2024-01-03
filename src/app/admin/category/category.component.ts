import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent  implements OnInit,OnDestroy{
  
  category:any=[]
  pagesize = 6
  currentPage = 1
  private subscribe: Subscription = new Subscription()
  constructor(private _adminservice: AdminService,private _Router:Router ,private _toastr :ToastrService) {

  }
  ngOnInit(): void {
    this.subscribe.add(
    this._adminservice.getCategory()
    .subscribe({
      next:(res)=>{
     this.category=res
      }
    })
    )
  }

  refersh(){
    this.subscribe.add(
    this._adminservice.getCategory()
    .subscribe({
      next:(res)=>{
     this.category=res
      }
    })
    )
  }
  addcategory(categoryval:any){
    this.subscribe.add(
   this._adminservice.addCategory(categoryval)
   .subscribe({
   next:()=>{
    this.refersh()
   } ,
   error:(err)=>{
    this._toastr.error(err.error.message)
  }
   })
    )
   
  }
  editcategory(category:any){
    this._Router.navigate(['/admin/categoryUpdate',{id:category}])
  }
  block_or_unblock(id:string,categoryBlockStatus:boolean){
   
    
    if(categoryBlockStatus===true){
      this.subscribe.add(
      this._adminservice.category_block(id,false).subscribe({
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

      this._adminservice.category_block(id,true).subscribe({
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
