import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brand-edit.component.html',
  styleUrl: './brand-edit.component.css'
})
export class BrandEditComponent implements OnInit {
  constructor(private _adminService:AdminService,private _route:ActivatedRoute,private _Router:Router,private _toastr :ToastrService ){}
  brandData:any
ngOnInit(): void {
  this._route.params.subscribe(params => {
    this._adminService.brandDetail(params['id']).subscribe({
      next: (res) => {
        this.brandData = res
      },
      error:(err)=>{
       this._toastr.error(err.error.message)
      }
    })
  });
  console.log(this.brandData);
  
}
Brandupdate(id:string,brandval:string){
  this._adminService.updateBrand(id,brandval).subscribe({
    next:()=>{
      this._Router.navigate(['/admin/brandAdd'])
    },
    error:(err)=>{
      this._toastr.error(err.error.message)
     }
  })
}
}
