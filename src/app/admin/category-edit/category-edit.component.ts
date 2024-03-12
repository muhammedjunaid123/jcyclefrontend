import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.css'
})
export class CategoryEditComponent implements OnInit,OnDestroy{
  categoryData:any
  private subscribe: Subscription = new Subscription()
  constructor(private _adminService:AdminService,private _route:ActivatedRoute,private _Router:Router,private _toastr :ToastrService ){}
  ngOnInit(): void {
    this.subscribe.add(
    this._route.params.subscribe(params => {
      this._adminService.categoryDetail(params['id']).subscribe({
        next: (res) => {
          this.categoryData = res
        }
      })
    })
    )

}
categoryupdate(id:string,categoryval:string){
  this.subscribe.add(
  this._adminService.updatecategory(id,categoryval).subscribe({
    next:()=>{
      this._Router.navigate(['/admin/categoryAdd'])
    }
  })
  )
}
ngOnDestroy(): void {
  this.subscribe.unsubscribe()
}
}

