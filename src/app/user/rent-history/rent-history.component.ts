import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/user/users.service';

@Component({
  selector: 'app-rent-history',
  templateUrl: './rent-history.component.html',
  styleUrl: './rent-history.component.css'
})
export class RentHistoryComponent implements OnDestroy {
today=new Date()
Date = this.today.toISOString().split('T')[0];
@Input() rentHistory:any=[]
pagesize = 6
currentPage = 1
search: string = ''

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
      error: (err) => {
        console.log(err);

      }
    })
  )
}


ngOnDestroy(): void {
 this.subscribe.unsubscribe()  
}
}
