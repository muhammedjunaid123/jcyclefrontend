import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/user/users.service';
import { Router } from '@angular/router';
import { service } from 'src/app/servicer/types/servicer.types';
import { environment } from 'src/environments/environment.development';
import { user } from '../types/user.types';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit, OnDestroy {


  constructor(private _userService: UsersService, private _router: Router, private _toastr: ToastrService) { }

  service!: service[]

  pagesize = 6
  currentPage = 1
  private subscribe: Subscription = new Subscription()

  ngOnInit(): void {
    this.subscribe.add(   
      this._userService.getAllService().subscribe({
        next: (res: service[]) => {
          this.service = res
          console.log(this.service, 'service');
  
        },
       
      })
    )
 
  }
  Refresh() {
    this.subscribe.add(
      this._userService.getAllService().subscribe({
        next: (res: service[]) => {
          this.service =  res
          console.log(this.service, 'refersh');
         
  
  
        },
      
      })
    )

  }

  razor(data: service) {
   this._router.navigate(['serviceCheckout',{id:data._id}])
  }

  ngOnDestroy(): void {
  this.subscribe.unsubscribe()
  }

}
