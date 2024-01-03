import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UsersService } from 'src/app/services/user/users.service';
import { Refresh } from '@ngrx/store-devtools/src/actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent  implements OnInit,OnDestroy{
  pagesize = 6
  currentPage = 1
  private subscribe: Subscription = new Subscription()
  status=['processing','shipped','delivered','cancelled','return']
  order: any = [];
  user:any =[];
  
  filterObj = {
    "Name": "",
    "ContactNo": "",
    "Email": "",
    "PageNumber": 1,
    "PageSize": 10
  }
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

  onPrevious() {
    this.filterObj.PageNumber --;
    this.filetrorder('');
  }
  onNext() {
    this.filterObj.PageNumber ++;
    this.filetrorder('');
  }

  filetrorder(param: string) {
    
    // // this._http.post('',this.filterObj).subscribe((res:any)=> {
    // //   this.order = res.data;
    // })
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
