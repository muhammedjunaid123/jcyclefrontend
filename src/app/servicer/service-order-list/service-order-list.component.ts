import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/user/users.service';
import { ServicerService } from 'src/app/services/servicer/servicer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-order-list',
  templateUrl: './service-order-list.component.html',
  styleUrl: './service-order-list.component.css'
})
export class ServiceOrderListComponent implements OnDestroy {
  service: any = []
  pagesize = 6
  currentPage = 1
  search: string = ''
  today = new Date()
  Date = this.today.toISOString().split('T')[0];
  private subscribe: Subscription = new Subscription()
  constructor(private _servicerService: ServicerService,private _router:Router) { }
  ngOnInit(): void {
    this.subscribe.add(
      this._servicerService.getUserserviceHistory().subscribe({
        next: (res: any) => {
          this.service = res
          console.log(this.service);
        },
       
      })
    )

  }
  pageTitle: string = 'Server Side Filter';
  refresh() {
    this.subscribe.add(
      this._servicerService.getUserserviceHistory().subscribe({
        next: (res: any) => {
          this.service = res
          console.log(this.service);


        },
        
      })
    )
  }


  cancelled(itemId: any, price: number, user: any,) {
  
    this.subscribe.add(
      this._servicerService.serviceOrderCancel(itemId, user, price).subscribe({
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
