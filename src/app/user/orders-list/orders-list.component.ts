import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/user/users.service';
import { Subscription } from 'rxjs';
import { order } from '../types/user.types';


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent implements OnDestroy {
  @Input() order: order[] = []
  pagesize = 6
  currentPage = 1
  search: string = ''

  private subscribe: Subscription = new Subscription()

  pageTitle: string = 'Server Side Filter';
  constructor(private _userService: UsersService) { }
  refresh() {
    this.subscribe.add(
      this._userService.orderLoad().subscribe({
        next: (res: order[]) => {
          this.order = res
          console.log(this.order);

          console.log(this.order[0]);
        },
       
      })
    )
  }


  cancelled(user: any, itemId: any, price: number, count: number) {
    const Total = price * count
    this.subscribe.add(
      this._userService.changeStatus(user, itemId, 'cancelled', Total).subscribe({
        next: () => {
          this.refresh()
        },
     
      })
    )
  }
  return(user: any, itemId: any, price: number, count: number) {
    const Total = price * count
    this.subscribe.add(
      this._userService.changeStatus(user, itemId, 'return', Total).subscribe({
        next: () => {
          this.refresh()
        },
      
      })
    )
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
