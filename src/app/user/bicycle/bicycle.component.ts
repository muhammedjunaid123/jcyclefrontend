import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/user/users.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { bicycle, brand, category, filter } from '../types/user.types';
import { Store, select } from '@ngrx/store';
import { loadBicycle } from '../store/user.action';
import { ProductData } from '../store/user.selector'
import { Subscription, map } from 'rxjs';


@Component({

  templateUrl: './bicycle.component.html',
  styleUrl: './bicycle.component.css'
})
export class BicycleComponent implements OnInit, OnDestroy {
  product: bicycle[] = []
  Product: bicycle[] = []
  brand: brand[] = []
  category: category[] = []
  search:string=''
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
this.subscribe.add(
  this._userService.loadBicycle().subscribe({
    next: (res: bicycle[]) => {
      console.log(res);
      
      this.product = res
      console.log(this.product,'1');
      
    },
    
  })
)

    this.productForm = this._fb.group({
      brand: ['', Validators.required],
      category: ['', Validators.required],
      gears: ['', Validators.required],
      brake_type: ['', Validators.required],
      suspension: ['', Validators.required]
    })


   

    this.subscribe.add(
      this._userService.getBrand().subscribe({
        next: (res:brand[]) => {
          this.brand = res
        }
      })
    )
    this.subscribe.add(
      this._userService.getCategory().subscribe({
        next: (res:category[]) => {
          this.category = res
        }
      })
    )

  }
  
  refersh() {
    this.productForm = this._fb.group({
      brand: ['', Validators.required],
      category: ['', Validators.required],
      gears: ['', Validators.required],
      brake_type: ['', Validators.required],
      suspension: ['', Validators.required]
    })
    this.subscribe.add(
      this._userService.loadBicycle().subscribe({
        next: (res: bicycle[]) => {
          this.product = res
        },
        
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
       
      })
    )
  }
  filter() {
   
    const filter: filter = this.productForm.getRawValue()
    console.log(filter);

    this._userService.filterProduct(filter).subscribe({
      next: (res:bicycle[]) => {
        this.product = res
      },
    
    })





  }

  productDetails(id: string) {
    this._router.navigate(['/bicycleDetail', { id: id }])
  }

  ngOnDestroy(): void {

    this.subscribe.unsubscribe()
  }

  
  
}


