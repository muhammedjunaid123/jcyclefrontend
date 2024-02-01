import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/user/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { address, order, user, wallet } from '../types/user.types';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy {
  wallet: wallet[] = []
  order: order[] = [];
  address: address[] = []
  rentHistory: any = []
  rentBbtn = false
  ordernav = false
  walletnav = false
  addressnav = false
  rentnav = false
  user: any
  userData!: user
  edit = false
  nameForm!: FormGroup
  RentProduct: any = []
  rentHostBbtn=true
  rentHistoryHost:any=[]
  servicenav=false
  service:any=[]
  TotalWallet:number=0
  ngOnInit(): void {

    this._userService.userData().subscribe({
      next: (res: user) => {
        this.userData = res
        if (this.edit === true) {
          const name = this.userData['name']
          this.nameForm.setValue({ name: name });
        }
      },
      
    })
  }
  private subscribe: Subscription = new Subscription()
  constructor(private _fb: FormBuilder, private _userService: UsersService, private _router: Router, private _toastr: ToastrService) { }
  getwallet() {
    this.rentHistory=[]
    this.rentHistoryHost=[]
    this.RentProduct=[]
    this.order = []
    this.address = []
    this.walletnav = true
    this.ordernav = false
    this.addressnav = false
    this.servicenav=false
    this.service=[]
    this.subscribe.add(
      this._userService.loadWallet().subscribe({
        next: (res: user) => {
          this.TotalWallet=res['wallet']
          this.wallet = res['walletHistory']

        }
      })
    )
  }
  getOrders() {
    this.rentHistory=[]
    this.rentHistoryHost=[]
    this.RentProduct=[]
    this.wallet = []
    this.address = []
    this.ordernav = true
    this.addressnav = false
    this.walletnav = false
    this.servicenav=false
    this.service=[]
    this.subscribe.add(
      this._userService.orderLoad().subscribe({
        next: (res: any) => {
          this.order = res
        },
       
      })
    )
  }
  refersh() {
    this._userService.userData().subscribe({
      next: (res: user) => {
        this.userData = res
        if (this.edit === true) {
          const name = this.userData['name']
          this.nameForm.setValue({ name: name });
        }
      },
     
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
              this.edit = false
            },
           
          })
      )
    } else {
      this._toastr.warning('fill the input')
    }
  }
  editchage() {
    if (this.edit === true) {
      this.edit = false
    } else {
      this.edit = true
      this.nameForm = this._fb.group({
        name: [this.userData['name'], Validators.required],
      })
    }
  }
  getAddrress() {
    this.wallet = []
    this.order = []
    this.rentHistory=[]
    this.rentHistoryHost=[]
    this.RentProduct=[]
    this.addressnav = true
    this.ordernav = false
    this.walletnav = false
    this.servicenav=false
    this.service=[]
    this.subscribe.add(this._userService.loadAddress().subscribe({
      next: (res: any) => {
        this.address = res['address']


      }
    }))

  }
  getRent() {
    this.wallet= []
    this.order= [];
    this.address= []
    this.rentHistory = []
    this.rentBbtn = false
    this.ordernav = false
    this.walletnav = false
    this.addressnav = false
    this.RentProduct= []
    this.rentHostBbtn=true
    this.rentHistoryHost=[]
   this.rentnav=true
   this.servicenav=false
    this.service=[]
    this._userService.userRentHistory().subscribe({
      next: (res) => {
        this.rentHistory = res
        console.log(this.rentHistory,this.rentnav);
        
      }
    })
  }
  logout() {
    localStorage.removeItem(environment.UserSecret)
    this._router.navigate([''])
  }
  rentProductDetails() {
    this.getRentProduct()
    this.rentBbtn = true
    
  } 
  rentHistoryDetails() {
    this.RentProduct=[]
    this.rentBbtn = false
    this.getRent()
    
  }
  getRentProduct() {
    this.rentHostBbtn=true
    this.rentHistoryHost=[]
     this._userService.getUserRentProduct().subscribe({
      next:(res)=>{
        this.RentProduct= res
        console.log(this.RentProduct);
        
      }
     })
  }
  getRentHost() {
this.rentHostBbtn=false
    this.RentProduct=[]
    this._userService.userRentHistory().subscribe({
      next: (res) => {
        this.rentHistoryHost = res
        

      }
    })
  }
  getService(){
    this.wallet= []
    this.order= [];
    this.address= []
    this.rentHistory = []
    this.rentBbtn = false
    this.ordernav = false
    this.walletnav = false
    this.addressnav = false
    this.RentProduct= []
    this.rentHostBbtn=true
    this.rentHistoryHost=[]
   this.rentnav=true
  this.rentnav=false
  this.servicenav=true
    this._userService.getUserserviceHistory().subscribe(
      {
        next:(res)=>{
          this.service=res
          console.log(this.service,'servicehistoerr');
          
        }
      }
    )
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
