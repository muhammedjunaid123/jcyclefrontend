import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/user/users.service';
import { Router } from '@angular/router';
import { service } from 'src/app/servicer/types/servicer.types';
import { environment } from 'src/environments/environment.development';
import { user } from '../types/user.types';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
declare var Razorpay: any;
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit, OnDestroy {


  constructor(private _userService: UsersService, private _router: Router, private _toastr: ToastrService) { }

  service!: service[]
  userName!: string
  userEmail!: string
  userPhone!: number
  pagesize = 6
  currentPage = 1
  private subscribe: Subscription = new Subscription()

  ngOnInit(): void {
    this.subscribe.add(   
      this._userService.getAllService().subscribe({
        next: (res: service[]) => {
          this.service = res
          console.log(this.service, 'service');
  
        },
        error: (error) => {
          console.log(error);
  
        }
      })
    )
 this.subscribe.add(
   this._userService.userData().subscribe({
     next: (res: user) => {
       this.userEmail = res?.email
       this.userName = res?.name
       this.userPhone = res?.phone
     }
   })
 )
  }
  Refresh() {
    this.subscribe.add(
      this._userService.getAllService().subscribe({
        next: (res: service[]) => {
          this.service =  res
          console.log(this.service, 'refersh');
         
  
  
        },
        error: (error) => {
          console.log(error);
  
        }
      })
    )

  }

  razor(data: service) {
    const RazorpayOptions = {
      description: 'Sample Payment',
      currency: 'INR',
      amount: data.price * 100,
      name: 'JCYCLE',
      key: environment.RAZOR_KEY,
      handler: (res: any) => {
        this.verifyPayment(res, data)
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
  verifyPayment(res: any, data: service) {

    const orderDetails = {
      user: localStorage.getItem(environment.UserSecret),
      date: data.date,
      time: data.time,
      owner: data.owner,
      razorId: res,
      paymentMethod: 'razor',
      productID: data._id,
      totalAmount: data.price
    }
   this.subscribe.add(
     this._userService.addServiceOrder(orderDetails).subscribe({
       next: () => {
         this._toastr.success('order success')
         this.Refresh()
       }
     })
   )
  }
  ngOnDestroy(): void {
  this.subscribe.unsubscribe()
  }

}
