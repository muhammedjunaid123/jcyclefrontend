import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AdminModule } from '../admin.module';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  constructor(private _router: Router, private _route: ActivatedRoute, private _adminService: AdminService) { }

  product: any = []
  pagesize = 6
  currentPage = 1
  ngOnInit(): void {
    this._adminService.getProduct().subscribe({
      next: (res) => {
        this.product = res
      }
    })

  }
  refersh() {
    this._adminService.getProduct().subscribe({
      next: (res) => {
        this.product = res
      }
    })

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
      this._adminService.product_block(id, false).subscribe({
        next: () => {
          this.refersh()
        },
        error: (err: Error) => {
          console.log(err);

        }
      })
    } else {
      this._adminService.product_block(id, true).subscribe({
        next: () => {
          this.refersh()
        },
        error: (err: Error) => {
          console.log(err);

        }
      })
    }
  }
  editProduct(id: any) {
    this._router.navigate(['/admin/productedit', { id: id }])
  }
}
