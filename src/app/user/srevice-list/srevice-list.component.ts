import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/user/users.service';

@Component({
  selector: 'app-srevice-list',
  templateUrl: './srevice-list.component.html',
  styleUrl: './srevice-list.component.css'
})
export class SreviceListComponent implements OnInit, OnDestroy {
  @Input() service!:any
    pagesize = 6
  currentPage = 1
  search: string = ''
  today=new Date()
  Date = this.today.toISOString().split('T')[0];
  private subscribe: Subscription = new Subscription()
ngOnInit(): void {
  console.log(this.service,'from list');
  
}
  pageTitle: string = 'Server Side Filter';
  constructor(private _userService: UsersService) { }
  refresh() {
    this.subscribe.add(
      this._userService.getUserserviceHistory().subscribe({
        next: (res:any) => {
          this.service = res
          console.log(this.service);

          
        },
        error: (err) => {
          console.log(err);

        }
      })
    )
  }


  cancelled( itemId: any, price: number,user: any,) {
    
    this.subscribe.add(
      this._userService.serviceOrderCancel(itemId,user, price).subscribe({
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
