import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/user/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { address } from '../types/user.types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrl: './add-address.component.css'
})
export class AddAddressComponent implements OnInit,OnDestroy {
  constructor(private _userService: UsersService, private _fb: FormBuilder, private _router: Router, private _toastr: ToastrService) { }
  addressForm!:FormGroup
  private subscribe: Subscription = new Subscription()
  ngOnInit(): void {
    this.addressForm = this._fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      mobile: ['', Validators.required],
      housename: ['', Validators.required],
      email: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required],
      country: ['', Validators.required],
      pin: ['', Validators.required]
    })
  }
  addressCreate(){
    if(this.addressForm.valid){
    this.subscribe.add( this._userService.addAddress(this.addressForm.value).subscribe({
      next:(res:address)=>{
             this._router.navigate(['/profile'])
      }
    })
      )
   
    }else{
      this._toastr.warning('input can be null!!')
    }
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}


