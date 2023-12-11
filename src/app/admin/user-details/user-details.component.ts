import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  user:any
  constructor(private _adminService:AdminService,private _route:ActivatedRoute,private _Router:Router ){}
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this._adminService.userDetail(params['id']).subscribe({
        next: (res) => {
          this.user = res
        }
      })
    });

}
}
