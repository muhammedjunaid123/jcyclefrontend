import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/user/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent implements OnDestroy,OnInit {
  @Input() order:any=[]
  pagesize = 6
  currentPage = 1
  status=['processing','shipped','delivered','cancelled','return']
 
  private subscribe: Subscription = new Subscription()
  
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
   
    
  }

  

  filetrorder(param: string) {
    
    // // this._http.post('',this.filterObj).subscribe((res:any)=> {
    // //   this.order = res.data;
    // })
  }

  
  cancelled(user: any, itemId: any,price:number,count:number){
    const Total=price*count
    this.subscribe.add(
    this._userService.changeStatus(user,itemId,'cancelled',Total).subscribe({
      next:()=>{
        this.refresh()
      },
      error:(err)=>{
    console.log(err);
    
      }
    })
    )
  }
  return(user: any, itemId: any,price:number,count:number){
    const Total=price*count
    this.subscribe.add(
    this._userService.changeStatus(user,itemId,'return',Total).subscribe({
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
    this.order=[]
  }
}
