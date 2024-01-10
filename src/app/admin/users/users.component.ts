import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Router } from '@angular/router';
import { user } from 'src/app/user/types/user.types';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  search = ''
  users!: user[]
  pagesize = 3
  currentPage = 1
  constructor(private _adminService: AdminService, private _Router: Router) { }
  ngOnInit(): void {
    this._adminService.getUsers()
      .subscribe({
        next: (res: user[]) => {
          this.users = res
        },
        error: (error: Error) => {
          console.log(error);

        }
      })
  }
  refersh() {
    this._adminService.getUsers()
      .subscribe({
        next: (res: user[]) => {
          this.users = res
        },
        error: (error: Error) => {
          console.log(error);

        }
      })
  }
  block_or_unblock(id: string, userBlockStatus: boolean) {
    console.log(userBlockStatus);

    if (userBlockStatus === true) {
      this._adminService.User_block(id, false).subscribe({
        next: () => {
          this.refersh()
        },
        error: (err: Error) => {
          console.log(err);

        }
      })
    } else {
      this._adminService.User_block(id, true).subscribe({
        next: () => {
          this.refersh()
        },
        error: (err: Error) => {
          console.log(err);

        }
      })
    }
  }
  viewUser(id: string) {
    this._Router.navigate(['/admin/user-details', { id: id }])
  }
}
