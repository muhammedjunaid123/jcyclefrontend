import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin/admin.service';
import { user } from 'src/app/user/types/user.types';
import { service } from 'src/app/servicer/types/servicer.types';

@Component({
  selector: 'app-servicers',
  templateUrl: './servicers.component.html',
  styleUrl: './servicers.component.css'
})
export class AdminServicersComponent implements OnDestroy,OnInit {

  search = ''
  sevicer!:any
  pagesize = 3
  currentPage = 1
  private subscribe:Subscription= new Subscription()
  constructor(private _adminService: AdminService, private _Router: Router) { }
  ngOnInit(): void {
    this.subscribe.add(
      this._adminService.Servicers()
        .subscribe({
          next: (res: any) => {
            this.sevicer = res
          },
         
        })
    )
  }
  refersh() {
    this.subscribe.add(
      this._adminService.Servicers()
        .subscribe({
          next: (res: any) => {
            this.sevicer = res
            console.log(this.sevicer);
            
          },
          
        })
    )

    
  }
  block_or_unblock(id: string, userBlockStatus: boolean) {
    console.log(userBlockStatus);

    if (userBlockStatus === true) {
      this.subscribe.add(
        this._adminService.servicer_block(id, false).subscribe({
          next: () => {
            this.refersh()
          },
          
        })
      )
    } else {
      this.subscribe.add(
        this._adminService.servicer_block(id, true).subscribe({
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
 