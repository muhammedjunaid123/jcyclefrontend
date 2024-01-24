import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/user/users.service';
import { ToastrService } from 'ngx-toastr';
import { Store, select } from '@ngrx/store';
import { datePickerT, rent, user } from '../types/user.types';
import { datepikerData } from '../store/user.selector';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.development';
declare var Razorpay: any;
@Component({
  selector: 'app-rent-checkout',
  templateUrl: './rent-checkout.component.html',
  styleUrl: './rent-checkout.component.css'
})
export class RentCheckoutComponent implements OnInit, OnDestroy {
  constructor(private _route: ActivatedRoute, private _userService: UsersService, private _toastr: ToastrService, private _router: Router, private _Store: Store) { }
  product!: rent
  date: boolean = false
  flag!: boolean
  totalAmount!: number
  userName!: string
  userEmail!: string
  userPhone!: number
  countFordate: number = 0
  dateData!: datePickerT
  filterDateData!: any
  today = new Date()
  private subscribe: Subscription = new Subscription()
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

            this.product = res
            this.totalAmount = this.product.price

            this.filterDateData = res['bookedDate']
            let Start: Date = this.dateData.start
            let end: Date = this.dateData.end
            const timeDifference: number = Start.getTime() - end.getTime();
            console.log(timeDifference, 'diff');

            let daysDifference: number = timeDifference / (1000 * 60 * 60 * 24);
            if (daysDifference === 0) {
              daysDifference = 1
            }

            console.log(daysDifference, this.totalAmount);

            this.totalAmount = this.totalAmount * Math.abs(daysDifference)




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
  razor() {
    const RazorpayOptions = {
      description: 'Sample Payment',
      currency: 'INR',
      amount: this.totalAmount * 100,
      name: 'JCYCLE',
      key: environment.RAZOR_KEY,
      handler: (res: any) => {
        this.verifyPayment(res)
      },

      prefill: {
        name: this.userName,
        email: this.userEmail,
        phone: this.userPhone,
      },
      theme: {
        color: '#800000',
      },
      modal: {
        ondismiss: () => {
          console.log('dismissed');
        }
      }
    }
    const pass = () => {
      console.log('payment susssus');

    }
    const fail = () => {
      console.log('payment fail');

    }

    Razorpay.open(RazorpayOptions, pass, fail)

  }
  verifyPayment(res: any) {
    const orderDetails = {
      user: localStorage.getItem(environment.UserSecret),
      Date: { start: this.dateData.start, end: this.dateData.end },
      owner: this.product.owner._id,
      razorId: res,
      paymentMethod: 'razor',
      productID: this.product._id,
      totalAmount: this.totalAmount
    }
     this.subscribe.add(
       this._userService.addRentOrder(orderDetails).subscribe({
         next: () => {
           this._toastr.success('order success')
           this._router.navigate(['rent'])
   
         }
       })
     )
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}

