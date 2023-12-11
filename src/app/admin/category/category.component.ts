import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent  implements OnInit {
  
  category:any=[]

  constructor(private _adminservice: AdminService,private _Router:Router ,private _toastr :ToastrService) {

  }
  ngOnInit(): void {
    this._adminservice.getCategory()
    .subscribe({
      next:(res)=>{
     this.category=res
      }
    })
  }

  refersh(){
    this._adminservice.getCategory()
    .subscribe({
      next:(res)=>{
     this.category=res
      }
    })
  }
  addcategory(categoryval:any){
   this._adminservice.addCategory(categoryval)
   .subscribe({
   next:()=>{
    this.refersh()
   } ,
   error:(err)=>{
    this._toastr.error(err.error.message)
  }
   })
   
  }
  editcategory(category:any){
    this._Router.navigate(['/admin/categoryUpdate',{id:category}])
  }
  block_or_unblock(id:string,categoryBlockStatus:boolean){
   
    
    if(categoryBlockStatus===true){
      this._adminservice.category_block(id,false).subscribe({
        next:()=>{
          this.refersh()
        },
        error:(err:Error)=>{
          console.log(err);
          
        }
      })
    }else{
      this._adminservice.category_block(id,true).subscribe({
        next:()=>{
          this.refersh()
        },
        error:(err:Error)=>{
          console.log(err);
          
        }
      })
    }
  }
}
