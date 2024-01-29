import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { service } from 'src/app/servicer/types/servicer.types';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/user/users.service';
import { environment } from 'src/environments/environment.development';
import { user } from '../types/user.types';
declare var Razorpay: any;
@Component({
  selector: 'app-order-service-page',
  templateUrl: './order-service-page.component.html',
  styleUrl: './order-service-page.component.css'
})
export class OrderServicePageComponent  implements OnInit,OnDestroy{
 s!:service
 constructor(private _userService: UsersService, private _router: Router, private _toastr: ToastrService,private _activeRoute:ActivatedRoute) { }


  userName!: string
  userEmail!: string
  userPhone!: number
  pagesize = 6
  currentPage = 1
  UserWallet:number=0
  isChecked: boolean = false;
  private subscribe: Subscription = new Subscription()
  ngOnInit(): void {
    this.subscribe.add(  
      this._activeRoute.params.subscribe(params=>{
        this._userService.getService(params['id']).subscribe({
          next: (res: service) => {
            this.s = res
          console.log(this.s,'this is the service data');
          
    
          },
         
        })
      }) 
    )
 this.subscribe.add(
   this._userService.userData().subscribe({
     next: (res: user) => {
       this.userEmail = res?.email
       this.userName = res?.name
       this.userPhone = res?.phone
       this.UserWallet=res['wallet']
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
  let orderDetails!:any
 if(this.isChecked){
   orderDetails = {
    user: localStorage.getItem(environment.UserSecret),
    date: data.date,
    time: data.time,
    owner: data.owner,
    razorId: res,
    paymentMethod: 'wallet',
    productID: data._id,
    totalAmount: data.price
  }
 }else{
    orderDetails = {
     user: localStorage.getItem(environment.UserSecret),
     date: data.date,
     time: data.time,
     owner: data.owner,
     razorId: res,
     paymentMethod: 'razor',
     productID: data._id,
     totalAmount: data.price
   }
 }
 this.subscribe.add(
   this._userService.addServiceOrder(orderDetails).subscribe({
     next: () => {
       this._toastr.success('order success')
      this._router.navigate(['service'])
     }
   })
 )
}
ngOnDestroy(): void {
  
}
}
