import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/user/users.service';
import { Subscription, count } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { bicycle, cart, cartProduct } from '../types/user.types';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnDestroy {
  DeliveryDate!: Date
  cartProduct!: cartProduct[]
  TotalAmount!: number
  private subscribe: Subscription = new Subscription()
  constructor(private _userService: UsersService, private _toastr: ToastrService) { }
  //
  ngOnInit(): void {
    this.subscribe.add(
      this._userService.loadCart().subscribe({
        next: (res: cart) => {
          this.TotalAmount = res['TotalAmount']
          this.cartProduct = res['product']
        },
        error: (error) => {
          console.log(error);

        }
      })
    )
    this.DeliveryDate = new Date()
    this.DeliveryDate.setDate(this.DeliveryDate.getDate() + 10)
  }
  counter = 1
  // update cart 
  up(c: number, id: string, stock: number, price: number) {
    if (c < stock) {
      console.log(price);
      this.subscribe.add(
        this._userService.updateCart(++c, id, price).subscribe({
          next: () => {
            this.refersh()
          },
          error: (err) => {
            console.log(err);

          }
        })
      )
    } else {
      this._toastr.warning('this is the limit')
    }
  }
  // update cart
  down(c: number, id: string, price: number) {
    if (c > 1) {

      console.log(price);
      this.subscribe.add(
        this._userService.updateCart(--c, id, -price).subscribe({
          next: () => {
            this.refersh()
          },
          error: (err) => {
            console.log(err);

          }
        })
      )
    } else {
      this.removeCart(id, price, c)
    }
  }
  //refersh the page value
  refersh() {
    this.subscribe.add(
      this._userService.loadCart().subscribe({
        next: (res) => {
          this.TotalAmount = res['TotalAmount']
          this.cartProduct = res['product']
        },
        error: (error) => {
          console.log(error);

        }
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
        error: (er) => {
          console.log(er);

        }
      })
    )
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
