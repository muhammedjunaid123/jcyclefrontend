import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/user/users.service';
import { address } from '../types/user.types';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrl: './address-edit.component.css'
})
export class AddressEditComponent  implements OnInit,OnDestroy{
  constructor(private _userService: UsersService, private _fb: FormBuilder, private _router: Router, private _toastr: ToastrService,private _activeRoute:ActivatedRoute) { }
  addressValue!:address
  addressForm!: FormGroup
  id!:string
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

    this._activeRoute.params.subscribe(param=>{
      this._userService.getAddress(param['id']).subscribe({
        next:(res:any)=>{
          this.id=param['id']
               console.log(res['address'][0]);
               
             this.addressValue={...res['address'][0]}
             console.log(this.addressValue);
             
         this.addressForm.setValue(this.addressValue)
        }
      })
    })
  }
   addressUpdate() {
    if (this.addressForm.valid) {
      let RawValue=this.addressForm.value

      this.subscribe.add(this._userService.updateAddress(this.id,this.addressForm.value).subscribe({
        next: () => {
          this._router.navigate(['/profile'])
        },
       
      })
      )

    } else {
      this._toastr.warning('input can be null!!')
    }
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
