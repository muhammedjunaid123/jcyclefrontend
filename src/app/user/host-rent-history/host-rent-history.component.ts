import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/user/users.service';

@Component({
  selector: 'app-host-rent-history',
  templateUrl: './host-rent-history.component.html',
  styleUrl: './host-rent-history.component.css'
})
export class HostRentHistoryComponent  implements OnDestroy{
  @Input() rentHistory:any=[]
  pagesize = 6
  currentPage = 1
  search: string = ''
  today=new Date()
Date = this.today.toISOString().split('T')[0];
  private subscribe: Subscription = new Subscription()
  
  
  constructor(private _userService: UsersService) { }


  
  refresh() {
    this.subscribe.add(
      this._userService.userRentHistory().subscribe({
        next:(res)=>{
          this.rentHistory=res
        }
      })
    )
  }
  
  
  cancelled(itemId:string,totalAmount:number,user:string) {
  
    this.subscribe.add(
      this._userService.changeStatusRent(itemId,totalAmount,user).subscribe({
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
