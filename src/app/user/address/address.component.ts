import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { address } from '../types/user.types';
import { UsersService } from 'src/app/services/user/users.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent implements OnDestroy  {
  constructor( private _router:Router,private _userService:UsersService){}
  @Input() addressArr!: address[]
  pSize = 2
  currentPage = 1
  private subscribe: Subscription = new Subscription()

  edit(id:any){
  this._router.navigate(['edit-address',{id:id}]) 
  }

  delete(id:any){
 this._userService.addressDelete(id).subscribe({
  next:()=>{
    this.refersh()
  },
 
 })
    } 
    refersh(){
      this.subscribe.add(this._userService.loadAddress().subscribe({
        next: (res: any) => {
          this.addressArr = res['address']
  
  
        }
      }))
    }

    ngOnDestroy(): void {
      this.subscribe.unsubscribe()
    }
}
