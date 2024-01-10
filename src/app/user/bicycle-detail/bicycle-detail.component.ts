import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/user/users.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';
import { Subscription } from 'rxjs';
import {  bicycle, productDetails } from '../types/user.types';

@Component({
  selector: 'app-bicycle-detail',
  templateUrl: './bicycle-detail.component.html',
  styleUrl: './bicycle-detail.component.css'
})
export class BicycleDetailComponent implements OnInit,OnDestroy {
  product!: bicycle
  total!: number
  Total!: number
  obj: any
  private subscribe: Subscription = new Subscription()


  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor(private _route: ActivatedRoute, private _userService: UsersService, private _toastr: ToastrService, private _router: Router) { }
  ngOnInit(): void {
    this.subscribe.add(
      this._route.params.subscribe(params => {
        this._userService.productDetail(params['id']).subscribe({
          next: (res:productDetails) => {   
            this.total = Math.round(res['total'])
            this.Total = Math.round(res['Total'])
            this.obj = res['obj']
            this.product =res['product']
            console.log(this.product, this.total, this.obj);

          }
        })
      })
    )
  }
  refersh() {
    this.subscribe.add(
      this._route.params.subscribe(params => {
        this._userService.productDetail(params['id']).subscribe({
          next: (res:productDetails) => {   
            this.total = Math.round(res['total'])
            this.Total = Math.round(res['Total'])
            this.obj = res['obj']
            this.product =res['product']
            console.log(this.product, this.total, this.obj);

          }
        })
      })
    )
  }
  wishlist(id: string) {
    if (!localStorage.getItem(environment.UserSecret)) {
      this._toastr.info('user not logged')
      this._router.navigate(['/login'])
      return
    }
    this.subscribe.add(
      this._userService.addWishlist(id).subscribe({
        next: (res) => {

          this.refersh()

        },
        error: (error) => {

          this._toastr.info(error.error.message)

        }

      })
    )
  }
  Addcart(id: string, price: number) {
    if (!localStorage.getItem(environment.UserSecret)) {
      this._toastr.info('user not logged')
      this._router.navigate(['/login'])
      return
    }
    this.subscribe.add(
      this._userService.addCart(id, price).subscribe({
        next: (res) => {
          this._toastr.success("added")

        },
        error: (error) => {
          this._toastr.info(error.error.message)

        }
      })
    )
  }
  showReview(id: string) {
    this._router.navigate(['/review', { id: id }])
  }
  addReview(id: string) {
    this._router.navigate(['/addReview', { id: id }])
  }

ngOnDestroy(): void {
  this.subscribe.unsubscribe()
}
}
