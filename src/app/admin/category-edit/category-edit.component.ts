import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.css'
})
export class CategoryEditComponent implements OnInit{
  categoryData:any
  constructor(private _adminService:AdminService,private _route:ActivatedRoute,private _Router:Router ){}
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this._adminService.categoryDetail(params['id']).subscribe({
        next: (res) => {
          this.categoryData = res
        }
      })
    });

}
categoryupdate(id:string,categoryval:string){
  this._adminService.updatecategory(id,categoryval).subscribe({
    next:()=>{
      this._Router.navigate(['/admin/categoryAdd'])
    }
  })
}
}

