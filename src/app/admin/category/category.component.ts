import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { adminCategory } from '../types/admin.types';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit, OnDestroy {

  category: adminCategory[] = []
  pagesize = 6
  currentPage = 1
  private subscribe: Subscription = new Subscription()
  constructor(private _adminservice: AdminService, private _Router: Router, private _toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.subscribe.add(
      this._adminservice.getCategory()
        .subscribe({
          next: (res: adminCategory[]) => {
            this.category = res
          }
        })
    )
  }

  refersh() {
    this.subscribe.add(
      this._adminservice.getCategory()
        .subscribe({
          next: (res: adminCategory[]) => {
            this.category = res
          }
        })
    )
  }
  addcategory(categoryval: any) {
    this.subscribe.add(
      this._adminservice.addCategory(categoryval)
        .subscribe({
          next: () => {
            this.refersh()
          },
         
        })
    )

  }
  editcategory(category: any) {
    this._Router.navigate(['/admin/categoryUpdate', { id: category }])
  }
  block_or_unblock(id: string, categoryBlockStatus: boolean) {
    if (categoryBlockStatus === true) {
      this.subscribe.add(
        this._adminservice.category_block(id, false).subscribe({
          next: () => {
            this.refersh()
          },
        
        })
      )
    } else {
      this.subscribe.add(

        this._adminservice.category_block(id, true).subscribe({
          next: () => {
            this.refersh()
          },
          
        })
      )
    }
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
