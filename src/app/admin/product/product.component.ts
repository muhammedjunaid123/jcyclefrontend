import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AdminModule } from '../admin.module';
import { Subscription } from 'rxjs';
import { bicycle } from 'src/app/user/types/user.types';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit,OnDestroy {

  constructor(private _router: Router, private _route: ActivatedRoute, private _adminService: AdminService) { }
  private subscribe: Subscription = new Subscription()
  product: bicycle[] = []
  pagesize = 6
  currentPage = 1
  search=''
  ngOnInit(): void {
    this.subscribe.add(
    this._adminService.getProduct().subscribe({
      next: (res:bicycle[]) => {
        this.product = res
      }
    })
    )
  }
  refersh() {
    this.subscribe.add(
    this._adminService.getProduct().subscribe({
      next: (res:bicycle[]) => {
        this.product = res
      }
    })
    )
  }

  productDetail(product: any) {
    this._router.navigate(['/admin/productDetail', { id: product._id }])
  }
  ProductAdd() {
    this._router.navigate(['/admin/productAdd'])
  }
  brandAdd() {
    this._router.navigate(['/admin/brandAdd'])
  }
  categoryAdd() {
    this._router.navigate(['/admin/categoryAdd'])
  }
  block_or_unblock(id: string, productBlockStatus: boolean) {


    if (productBlockStatus === true) {
      this.subscribe.add(
      this._adminService.product_block(id, false).subscribe({
        next: () => {
          this.refersh()
        },
       
      })
      )
    } else {
      this.subscribe.add(
      this._adminService.product_block(id, true).subscribe({
        next: () => {
          this.refersh()
        },
      
      })
      )
    }
  }
  editProduct(id: any) {
    this._router.navigate(['/admin/productedit', { id: id }])
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
