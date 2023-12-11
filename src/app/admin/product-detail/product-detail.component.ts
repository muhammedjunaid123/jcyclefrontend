import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: any = []
  constructor(private _adminService: AdminService, private _route: ActivatedRoute) { }
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this._adminService.productDetail(params['id']).subscribe({
        next: (res) => {
          this.product = res
        }
      })
    });
    console.log(this.product);
    
  }

}
