import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Router } from '@angular/router';
import { user } from 'src/app/user/types/user.types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit,OnDestroy {

  search = ''
  users!: user[]
  pagesize = 3
  currentPage = 1
  private subscribe:Subscription= new Subscription()
  constructor(private _adminService: AdminService, private _Router: Router) { }
  ngOnInit(): void {
    this.subscribe.add(
      this._adminService.getUsers()
        .subscribe({
          next: (res: user[]) => {
            this.users = res
          },
         
        })
    )
  }
  refersh() {
    this.subscribe.add(
      this._adminService.getUsers()
      .subscribe({
        next: (res: user[]) => {
          this.users = res
        },
      
      })
    )
    
  }
  block_or_unblock(id: string, userBlockStatus: boolean) {
    console.log(userBlockStatus);

    if (userBlockStatus === true) {
      this.subscribe.add(
        this._adminService.User_block(id, false).subscribe({
          next: () => {
            this.refersh()
          },
        
        })
      )
    } else {
      this.subscribe.add(
        this._adminService.User_block(id, true).subscribe({
          next: () => {
            this.refersh()
          },
         
        })
      )
    }
  }
  viewUser(id: string) {
    this._Router.navigate(['/admin/user-details', { id: id }])
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
