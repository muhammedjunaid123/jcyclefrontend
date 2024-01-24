import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bicycle, datePickerT, productDetails, rent, user } from '../types/user.types';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/user/users.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';
import { FormControl, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { datepikerData } from '../store/user.selector';
 
@Component({
  selector: 'app-rent-details',
  templateUrl: './rent-details.component.html',
  styleUrl: './rent-details.component.css'
})
export class RentDetailsComponent implements OnInit, OnDestroy {
  product!: rent
  date: boolean = false
  flag!: boolean
  totalAmount!: number
  userName!: string
  userEmail!: string
  userPhone!: number
  showAmount!: number
  countFordate: number = 0
  dateData!: any
  today = new Date()
  minDate = this.today.toISOString().split('T')[0];
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  filterDateData!: any
  dateFilter = (date: Date) => {
    console.log(date);

    const day = date.getDay()
    return day != 0 && day != 6
  }
  dateFilterObservable: Observable<(date: Date) => boolean> = new Observable(observer => {
    observer.next(this.dateFilter);
  });

  private subscribe: Subscription = new Subscription()
  total!: number
  Total!: number
  obj: any
  constructor(private _route: ActivatedRoute, private _userService: UsersService, private _toastr: ToastrService, private _router: Router, private _Store: Store) { }

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

  ngOnInit(): void {
    this.subscribe.add(
      this._Store.pipe(select(datepikerData)).subscribe({
        next: (res: datePickerT) => {
          this.dateData = res
  
          if (!this.dateData.start && !this.dateData.end && !this.dateData.location) {
            this._router.navigate(['datePicker'])
            return
          }
        },
        error: (Error) => {
          console.log(Error);
  
        }
      })
    )

    window.scrollTo(0, 0);
    this.subscribe.add(
      this._route.params.subscribe(params => {
        this._userService.rentDetail(params['id']).subscribe({
          next: (res: any) => { 
        console.log(res);

        this.total = Math.round(res['total'])
        this.Total = Math.round(res['Total'])
        this.obj = res['obj']
        this.product =res['product']




          }
        })
      })
    )
    this.subscribe.add(
      this._userService.userData().subscribe({
        next: (res: user) => {
          this.userName = res.name
          this.userEmail = res.email
          this.userPhone = res.phone
        }
      })
    )

  }
  onEnterKey(event: KeyboardEvent): void {
    event.preventDefault();
    console.log("Enter key is disabled in this input field");
  }
  totalRefersh() {


    ++this.countFordate
    console.log(this.countFordate);
    if (this.countFordate == 3) {
      this.totalAmount = this.showAmount
      this.countFordate = 0
      return
    }
    if (this.range.controls.start.value !== null && this.range.controls.end.value !== null) {
      let Start: Date = this.range.controls.start.value
      let end: Date = this.range.controls.end.value
      const timeDifference: number = Start.getTime() - end.getTime();
      let daysDifference: number = timeDifference / (1000 * 60 * 60 * 24);
      if (daysDifference === 0) {
        daysDifference = 1
      }
      this.totalAmount = this.totalAmount * Math.abs(daysDifference)
    }
    return

  }
  refersh() {
    this.subscribe.add(
      this._route.params.subscribe(params => {
        this._userService.rentDetail(params['id']).subscribe({
          next: (res: any) => {
            this.total = Math.round(res['total'])
            this.Total = Math.round(res['Total'])
            this.obj = res['obj']
            this.product =res['product']
          }
        })
      })
    )
  }


  showReview(id: string) {
    this._router.navigate(['/rent-review', { id: id }])
  }
  addReview(id: string) {
    this._router.navigate(['/addReview', { id: id, marker: 'rent' }])
  }

  paynow() {
    if (!localStorage.getItem(environment.UserSecret)) {
      this._router.navigate(['/login'])
      return
    }
    this._router.navigate(['/rentCheckout',{id:this.product._id}])
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
