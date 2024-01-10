import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/user/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { environment } from 'src/environments/environment.development';
import { loadBicycle } from '../store/user.action';
import { ProductData } from '../store/user.selector';
import { brand, category, filter, rent } from '../types/user.types';

@Component({
  selector: 'app-bicycle-rent',
  templateUrl: './bicycle-rent.component.html',
  styleUrl: './bicycle-rent.component.css'
})
export class BicycleRentComponent implements OnInit, OnDestroy {
  product: rent[] = []
  brand: brand[] = []
  category: category[] = []
  search: string = ''
  productForm!: FormGroup
  private subscribe: Subscription = new Subscription()
  pSize = 6
  currentPage = 1

  constructor
    (private _userService: UsersService,
      private _toastr: ToastrService, private _fb: FormBuilder,
      private _router: Router,
      private _Store: Store) { }
  ngOnInit(): void { 
    this._Store.dispatch(loadBicycle())
    this.productForm = this._fb.group({
      brand: ['', Validators.required],
      category: ['', Validators.required],
      gears: ['', Validators.required],
      brake_type: ['', Validators.required],
      suspension: ['', Validators.required]
    })


    this._userService.loadRentBicycle()
      .subscribe({
        next: (res: rent[]) => {
          this.product = res
          console.log(this.product, 'rent');

        },
        error: (Error) => {
          console.log(Error);

        }
      })




  }
  refersh() {

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
  filter() {
    
  }

  productDetails(id: string) {
    this._router.navigate(['/bicycleDetail', { id: id }])
  }

  ngOnDestroy(): void {

    this.subscribe.unsubscribe()
  }

}
