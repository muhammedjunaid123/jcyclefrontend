import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/user/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { address, order, user, wallet } from '../types/user.types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy {
  wallet: wallet[] = []
  order: order[] = [];
  address:address[]=[]
  user: any
  userData!:user
  edit = false
  nameForm!: FormGroup
  
  ngOnInit(): void {

    this._userService.userData().subscribe({
      next: (res:user) => {
        this.userData = res
        if(this.edit===true){
         const  name=this.userData['name']
          this.nameForm.setValue({name:name});
        }
      },
      error: (err) => {
        this._toastr.error(err.error.message)
      }
    })
  }
  private subscribe: Subscription = new Subscription()
  constructor(private _fb: FormBuilder, private _userService: UsersService, private _router: Router, private _toastr: ToastrService) { }
  getwallet() {
    this.order = []
    this.subscribe.add(
      this._userService.loadWallet().subscribe({
        next: (res:user) => {
          this.wallet = res['walletHistory']

        }, error: (err) => {
          console.log(err);

        }
      })
    )
  }
  getOrders() {
    this.wallet = []
    this.subscribe.add(
      this._userService.orderLoad().subscribe({
        next: (res: any) => {
          this.order = res
        },
        error: (err) => {
          console.log(err);

        }
      })
    )
  }
  refersh(){
    this._userService.userData().subscribe({
      next: (res:user) => {
        this.userData = res
        if(this.edit===true){
         const  name=this.userData['name']
          this.nameForm.setValue({name:name});
        }
      },
      error: (err) => {
        this._toastr.error(err.error.message)
      }
    })
  }
  saveName() {
    this.user = this.nameForm.controls
    if (this.nameForm.valid) {
      this.subscribe.add(
        this._userService.saveName(this.nameForm.value)
          .subscribe({
            next: (res: any) => {
             this.refersh()
             this.edit=false
            },
            error: (error: any) => {
              console.log(error);

              this._toastr.error(error.error.message);
            }
          })
      )
    }else{
      this._toastr.warning('fill the input')
    }
  }
  editchage(){
    if(this.edit===true){
      this.edit=false
    }else{
      this.edit=true
      this.nameForm = this._fb.group({
        name: [this.userData['name'], Validators.required],
      })
    }
  }
  getAddrress(){
    this.wallet=[]
    this.order=[]
    this.subscribe.add(this._userService.loadAddress().subscribe({
      next: (res: any) => { 
        this.address = res['address']
      
        
      }, error: (err: any) => {
        console.log(err);

      }
    }))
    
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
