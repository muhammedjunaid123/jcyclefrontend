import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { user } from 'src/app/user/types/user.types';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit,OnDestroy {
  user!:user
  private subscribe: Subscription = new Subscription()
  constructor(private _adminService:AdminService,private _route:ActivatedRoute,private _Router:Router ){}
  ngOnInit(): void {
    this.subscribe.add(
    this._route.params.subscribe(params => {
      this._adminService.userDetail(params['id']).subscribe({
        next: (res:user) => {
          this.user = res
        }
      })
    }))

}
ngOnDestroy(): void {
  this.subscribe.unsubscribe()
}
}
