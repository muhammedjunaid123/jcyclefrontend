import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/user/users.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  DeliveryDate!: Date
  cartProduct: any=[]
  constructor(private _userService: UsersService) { }
  ngOnInit(): void {

    this._userService.loadCart().subscribe({
      next: (res) => {
        this.cartProduct = res
        this.cartProduct = this.cartProduct['product']
        console.log(this.cartProduct);

      },
      error: (error) => {
        console.log(error);

      }
    })

    this.DeliveryDate = new Date()

    this.DeliveryDate.setDate(this.DeliveryDate.getDate() + 10)
  }
  counter = 1
  up(c:number) {
    c++
  }
  down(c:number) {
    if (c > 1) {
      c--
    }
  }
  refersh(){
    this._userService.loadCart().subscribe({
      next: (res) => {
        this.cartProduct = res
        this.cartProduct = this.cartProduct['product']
        console.log(this.cartProduct);

      },
      error: (error) => {
        console.log(error);

      }
    })
  }
  removeCart(id:string){
   this._userService.removeCart(id).subscribe({
    next:()=>{
      this.refersh()
    },
    error:(er)=>{
      console.log(er);
      
    }
   })
  }
}
