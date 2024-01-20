import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { brand, category, datePickerT, rent } from 'src/app/user/types/user.types';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/user/users.service';
import { datePiker } from 'src/app/user/store/user.action';
import { datepikerData } from 'src/app/user/store/user.selector';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-admin-rent',
  templateUrl: './admin-rent.component.html',
  styleUrl: './admin-rent.component.css'
})
export class AdminRentComponent implements OnInit, OnDestroy {

  product: any = []
  search: string = ''
  private subscribe: Subscription = new Subscription()
  pSize = 6
  currentPage = 1
  constructor
    (private _adminService: AdminService,
      private _toastr: ToastrService, private _fb: FormBuilder,
      private _router: Router,
      private _Store: Store) { }

  ngOnInit(): void {
    this._adminService.getRentProduct().subscribe({
      next: (res: any) => {
        console.log('heloooooooooo');

        this.product = res
        console.log(this.product, 'admin rent ');

      },
      error: (Error) => {
        console.log(Error);
        console.log(Error.message);

      }
    })


  }


  refersh() {
    this._adminService.getRentProduct().subscribe({
      next: (res: any) => {
        console.log('heloooooooooo');

        this.product = res
        console.log(this.product, 'admin rent ');

      },
      error: (Error) => {
        console.log(Error);
        console.log(Error.message);

      }
    })
  }

  blockRent(id: string,isBlocked:boolean) {
  
    this._adminService.blockRent(id,isBlocked).subscribe({
      next: () => {
        this.refersh()
      }
    })
  }

  ngOnDestroy(): void {

    this.subscribe.unsubscribe()
  }


}
