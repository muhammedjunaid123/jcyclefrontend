import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/user/users.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { address, cart, cartProduct } from '../types/user.types';

declare var Razorpay: any;

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.css'
})
export class PlaceOrderComponent implements OnInit,OnDestroy {
  selectedAddress: any = null;
  DeliveryDate!: Date
  cartProduct: cartProduct[] = []
  TotalAmount!: number
  length!: number
  userName!: string
  userEmail!: string
  userPhone!: string
   flag!:boolean
   addressArr!:address[]
  private subscribe: Subscription= new Subscription()
  constructor(private _userService: UsersService, private _toastr: ToastrService,
    private _router:Router) { }
  //
  ngOnInit(): void {
    this.subscribe.add(
    this._userService.loadCart().subscribe({
      next: (res:cart) => {
        
        this.TotalAmount = res['TotalAmount']
        this.userName = res['user']['name']
        this.userEmail = res['user']['email']
        this.userPhone = res['user']['phone']
        this.cartProduct=res['product']

        console.log(this.cartProduct);
        this.length = this.cartProduct.length

       this._userService.loadAddress().subscribe({
        next:(res:any)=>{      
         this.addressArr=res['address']
         console.log(this.addressArr);
         
        }
       })
        

      },
     
    })
    )


    this.DeliveryDate = new Date()

    this.DeliveryDate.setDate(this.DeliveryDate.getDate() + 10)
  }
  //refersh the page value
  refersh() {
    this.subscribe.add(
    this._userService.loadCart().subscribe({
      next: (res:cart) => { 
        this.TotalAmount = res['TotalAmount']
        this.userName = res['user']['name']
        this.userEmail = res['user']['email']
        this.userPhone = res['user']['phone']
        this.cartProduct=res['product']
        console.log(this.cartProduct);
        this.length = this.cartProduct.length
      },
    
    })
    )
  }
  // remove cart value
  removeCart(id: string, price: number, count: number) {
    this.subscribe.add(
    this._userService.removeCart(id, price, count).subscribe({
      next: () => {
        this.refersh()
      },
      
    })
    )
  }


  verifyPayment(res: any) {

    const orderDetails = {
      user:localStorage.getItem(environment.UserSecret),
      razorId: res,
      paymentMethod: 'razor'
    }

    this.subscribe.add(
      this._userService.orderProduct(orderDetails).subscribe({
        next: (res:any) => {
          this._router.navigate(['order-success', res])
          this._toastr.success('Booked Successsfully !')
        },
       
      })
    )

  }
  selectAddress(address: any) {
    this.selectedAddress = address;
  }
  

  razor(){
    const RazorpayOptions = {
      description: 'Sample Payment',
      currency: 'INR',
      amount: this.TotalAmount * 100,
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
    if(this.flag===false){  
       return
      }
      Razorpay.open(RazorpayOptions, pass, fail)

  }
 async payNow() {
    
   
 
    this.subscribe.add(
      this._userService.loadCart().subscribe({
        next: (res: cart) => {
          if (this.cartProduct.length !== res['product'].length) {
            this._toastr.error("There is some error, please refresh the page.")
           return
          } else {
            this.razor()
          }
        },

      })
    )
   

   if(this.flag===false){

   
   }
   
  }
ngOnDestroy(): void {
  this.subscribe.unsubscribe()
}
}

