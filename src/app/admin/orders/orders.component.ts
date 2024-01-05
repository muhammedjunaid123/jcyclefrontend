import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UsersService } from 'src/app/services/user/users.service';
import { Refresh } from '@ngrx/store-devtools/src/actions';
import { Subscription } from 'rxjs';
import { Status } from '../types/ordertypes';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent  implements OnInit,OnDestroy{
  pagesize = 6
  currentPage = 1
  private subscribe: Subscription = new Subscription()

  status=Status
  order: any = [];
  user:any =[];
  search=''
  
  pageTitle: string = 'Server Side Filter';
  constructor(private _userService:UsersService){}
  refresh(){
    this.subscribe.add(
    this._userService.orderLoad().subscribe({
      next:(res:any)=>{
        this.order=res
        console.log(this.order);
      
        console.log(this.order[0]);        
      },
      error:(err)=>{
      console.log(err);
    
      }
    })
    )
  }
  ngOnInit(): void {
   
    this.subscribe.add(
    this._userService.orderLoad().subscribe({
      next:(res:any)=>{
        this.order=res
        console.log(this.order);
      
        console.log(this.order[0]);        
      },
      error:(err)=>{
      console.log(err);
    
      }
    })
    )
  }

  


  

  changeStatus(user: any, itemId: any, selectedValue: string,price:number,count:number) {
   const Total=price*count
   this.subscribe.add(
  this._userService.changeStatus(user,itemId,selectedValue,Total).subscribe({
    next:()=>{
      this.refresh()
    },
    error:(err)=>{
  console.log(err);
  
    }
  })
   )


  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
