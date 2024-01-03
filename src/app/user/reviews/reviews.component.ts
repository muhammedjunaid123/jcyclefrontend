import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/user/users.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit,OnDestroy {
  product: any = []
  review: any = []
  user: any = []
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
        next: (res) => {
          console.log(params['id']);

          this.product = res
          console.log(this.product, 'this is review ');
          this.user = this.product['user']
          this.review = this.product['ratings_review']
          this.product = this.product['product']


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
        next: (res) => {
          this.product = res
          console.log(this.product, 'this is review ');
          this.user = this.product['user']
          this.review = this.product['ratings_review']
          this.product = this.product['product']


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
