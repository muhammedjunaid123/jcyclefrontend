import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ActivatedRoute, Route } from '@angular/router';
import { Subscription } from 'rxjs';
import { bicycle } from 'src/app/user/types/user.types';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit ,OnDestroy{
  product!: bicycle
  private subscribe: Subscription = new Subscription()
  constructor(private _adminService: AdminService, private _route: ActivatedRoute) { }
  ngOnInit(): void {
    this.subscribe.add(
    this._route.params.subscribe(params => {
      this._adminService.productDetail(params['id']).subscribe({
        next: (res:bicycle) => {
          this.product = res
          
        }
      })
    })
    )
    console.log(this.product);
    
  }
 ngOnDestroy(): void {
   this.subscribe.unsubscribe()
 }
}
