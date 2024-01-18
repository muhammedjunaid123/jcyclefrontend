import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/user/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { environment } from 'src/environments/environment.development';
import { datePiker, loadBicycle, loaddatePiker } from '../store/user.action';
import { ProductData, datepikerData } from '../store/user.selector';
import { brand, category, datePickerT, filter, rent } from '../types/user.types';

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
  date!: datePickerT
  private subscribe: Subscription = new Subscription()
  pSize = 6
  currentPage = 1
  today = new Date()
  locationforapi!: any
  location!: any
  startDate!: any
  endDate!: any
  minDate = this.today.toISOString().split('T')[0];
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
    location: new FormControl<string>('')
  });

  constructor
    (private _userService: UsersService,
      private _toastr: ToastrService, private _fb: FormBuilder,
      private _router: Router,
      private _Store: Store) { }
  ngOnInit(): void {

    this._Store.pipe(select(datepikerData)).subscribe({
      next: (res: datePickerT) => {
        this.date = res
        this.location = this.date.location

        if (!this.date.start && !this.date.end && !this.date.location) {
          this._router.navigate(['datePicker'])
          return
        }
        this.range.setValue({
          start: this.date.start,
          end: this.date.end,
          location: this.date.location
        });
        this._userService.getLocation().subscribe({
          next: (res: any) => {
            this.locationforapi = res[0]['city']
            console.log(this.locationforapi);

          }
        })


      },
      error: (Error) => {
        console.log(Error);

      }
    })


    this._userService.loadRentBicycle(this.date)
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
  valid() {
    if (this.range.controls.start.value !== null && this.range.controls.end.value !== null) {
      this.startDate = this.range.controls.start.value
      this.endDate = this.range.controls.end.value
    } else {
      this._toastr.warning('both date can be null ')

      return
    }


    let val = this.range.controls.location.value
    if (val !== undefined && val !== null) {
      this.location = val
    }


  }

    refersh() {
    this.valid()

    let res: datePickerT = {
      start: this.startDate,
      end: this.endDate,
      location: this.location
    }
    console.log(res, 'ressssss');


    this._Store.dispatch(datePiker({ datePickerval: res }))

    this._Store.pipe(select(datepikerData)).subscribe({
      next: (res: datePickerT) => {
        this.date = res


        if (!this.date.start && !this.date.end && !this.date.location) {
          this._router.navigate(['datePicker'])
          return
        }
        this.range.setValue({
          start: this.date.start,
          end: this.date.end,
          location: this.date.location
        });
        this._userService.getLocation().subscribe({
          next: (res: any) => {
            this.locationforapi = res[0]['city']
            console.log(this.locationforapi);

          }
        })


      },
      error: (Error) => {
        console.log(Error);

      }
    })
    this._userService.loadRentBicycle(this.date)
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


  filter() {

  }

  productDetails(id: string) {
    if (this.range.controls.start.value == null) {
      this._toastr.warning('start value can be null')
      return
    }
    if (this.range.controls.end.value == null) {
      this._toastr.warning('end value can be null')
      return
    }
    this._router.navigate(['/rent-detail', { id: id }])
  }

  ngOnDestroy(): void {

    this.subscribe.unsubscribe()
  }

}
