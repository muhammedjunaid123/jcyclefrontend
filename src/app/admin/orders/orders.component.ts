import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UsersService } from 'src/app/services/user/users.service';
import { Refresh } from '@ngrx/store-devtools/src/actions';
import { Subscription } from 'rxjs';
import { AdminStatus } from '../types/admin.types';
import { order, user } from 'src/app/user/types/user.types';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit, OnDestroy {
  pagesize = 6
  currentPage = 1
  private subscribe: Subscription = new Subscription()
  status = AdminStatus
  order: order[] = [];
  user: user[] = [];
  search = ''

  pageTitle: string = 'Server Side Filter';
  constructor(private _userService: UsersService) { }

  refresh() {
    this.subscribe.add(
      this._userService.orderLoad().subscribe({
        next: (res: order[]) => {
          this.order = res

        },
       
      })
    )
  }
  ngOnInit(): void {

    this.subscribe.add(
      this._userService.orderLoad().subscribe({
        next: (res: order[]) => {
          this.order = res

        },
       
      })
    )
  }






  changeStatus(user: any, itemId: any, selectedValue: string, price: number, count: number) {
    const Total = price * count
    this.subscribe.add(
      this._userService.changeStatus(user, itemId, selectedValue, Total).subscribe({
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
