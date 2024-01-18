import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ratings_review, rent, review, user } from '../types/user.types';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/user/users.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-rentreview',
  templateUrl: './rentreview.component.html',
  styleUrl: './rentreview.component.css'
})
export class RentreviewComponent implements OnInit,OnDestroy {
  product!: rent
  review!: ratings_review[]
  user!: user
  private subscribe: Subscription = new Subscription()
  pSize = 3
  currentPage = 1
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

  constructor(private _route: ActivatedRoute, private _userService: UsersService, private _toastr: ToastrService, private _router: Router) {


  }
  refersh() {
    this.subscribe.add(
      this._route.params.subscribe(params => {
        this._userService.productReview(params['id']).subscribe({
          next: (res:review) => {
            this.user = res['user']
            this.review = res['ratings_review']
            this.product = res['product']
          }, error: (error) => {
            console.log(error, 'this is the error');

          }
        })
      })
    )
  }
  ngOnInit(): void {
    this.subscribe.add(
      this._route.params.subscribe(params => {
        this._userService.productReview(params['id']).subscribe({
          next: (res:review) => {
            console.log(res);
            
            this.user = res['user']
            this.review = res['ratings_review']
            this.product = res['product']
       console.log(this.product,'product from rentreview');

       

          }, error: (error) => {
            console.log(error, 'this is the error');

          }
        })
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
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
