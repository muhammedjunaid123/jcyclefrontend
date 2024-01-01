import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/user/users.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent {
  pagesize = 6
  currentPage = 1
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
  }
  ngOnInit(): void {
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

  changeStatus(user: any, itemId: any, selectedValue: string) {
   
  this._userService.changeStatus(user,itemId,selectedValue).subscribe({
    next:()=>{
      this.refresh()
    },
    error:(err)=>{
  console.log(err);
  
    }
  })


  }
  cancelled(user: any, itemId: any){
    this._userService.changeStatus(user,itemId,'cancelled').subscribe({
      next:()=>{
        this.refresh()
      },
      error:(err)=>{
    console.log(err);
    
      }
    })
  }
  return(user: any, itemId: any){
    this._userService.changeStatus(user,itemId,'return').subscribe({
      next:()=>{
        this.refresh()
      },
      error:(err)=>{
    console.log(err);
    
      }
    })
  }
}
