import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/user/users.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { filter } from '../types/user.types';
import { Store, select } from '@ngrx/store';
import { loadBicycle } from '../store/user.action';
import { ProductData } from '../store/user.selector'
import { map } from 'rxjs';


@Component({

  templateUrl: './bicycle.component.html',
  styleUrl: './bicycle.component.css'
})
export class BicycleComponent implements OnInit, AfterViewInit {
  product: any = []
  brand: any = []
  category: any = []
  productForm!: FormGroup
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


    // this._userService.loadBicycle()
    //   .subscribe({
    //     next: (res: any) => {
    //       this.product = res

    //     },
    //     error: (Error) => {
    //       console.log(Error);

    //     }
    //   })

    this._userService.getBrand().subscribe({
      next: (res) => {
        this.brand = res
      }
    })
    this._userService.getCategory().subscribe({
      next: (res) => {
        this.category = res
      }
    })

  }
  ngAfterViewInit(): void {
    this._Store.pipe(select(ProductData)).subscribe({
      next: (res: any) => {
        this.product = res
      },
      error: (Error) => {
        console.log(Error);

      }
    })

    console.log(this.product, 'after view init');

  }
  refersh() {
    this._Store.dispatch(loadBicycle())
    this._Store.pipe(select(ProductData)).subscribe({
      next: (res: any) => {
        this.product = res
      },
      error: (Error) => {
        console.log(Error);

      }
    })
  }
  Addcart(id: string, price: number) {
    if (!localStorage.getItem(environment.UserSecret)) {
      this._toastr.info('user not logged')
      this._router.navigate(['/login'])
      return
    }
    this._userService.addCart(id, price).subscribe({
      next: (res) => {
        this._toastr.success("added")

      },
      error: (error) => {
        this._toastr.info(error.error.message)

      }
    })
  }
  wishlist(id: string) {
    if (!localStorage.getItem(environment.UserSecret)) {
      this._toastr.info('user not logged')
      this._router.navigate(['/login'])
      return
    }
    this._userService.addWishlist(id).subscribe({
      next: (res) => {

        this.refersh()

      },
      error: (error) => {

        this._toastr.info(error.error.message)

      }

    })
  }
  filter() {
console.log('enther the  filter');

    const filter: filter = this.productForm.getRawValue()
    console.log(filter);
   
    this._userService.filterProduct(filter).subscribe()





  }

  productDetails(id: string) {
    this._router.navigate(['/bicycleDetail', { id: id }])
  }
}


