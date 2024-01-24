import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/user/users.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent-userproduct-history',
  templateUrl: './rent-userproduct-history.component.html',
  styleUrl: './rent-userproduct-history.component.css'
})
export class RentUserproductHistoryComponent {
  pSize = 6
  currentPage = 1
  @Input() RentProduct:any=[]

  constructor(private _userService:UsersService,private _router:Router){}
  private subscribe: Subscription = new Subscription()

refersh(){
  this.subscribe.add(   
    this._userService.getUserRentProduct().subscribe({
      next:(res)=>{ 
        this.RentProduct= res
      
        
      }
     })
  )
}

  blockRentProduct(id:string,isBlocked:boolean){
    this.subscribe.add(   
      this._userService.blockRentProduct(id,isBlocked).subscribe({
       next:()=>{
    this.refersh()
       }
      }) 
    )
  }
  editRent(id:string){
    this._router.navigate(['/rentEdit',{id:id}])
  }
}
