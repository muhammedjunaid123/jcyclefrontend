import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/user/users.service';

@Component({
 
  templateUrl: './bicycle.component.html',
  styleUrl: './bicycle.component.css'
})
export class BicycleComponent implements OnInit {
  product:any=[]
  constructor(private _userService:UsersService){}
ngOnInit(): void {
  this._userService.loadBicycle()
  .subscribe({
    next:(res:any)=>{
       this.product=res
    },
    error:(Error)=>{
      console.log(Error);
      
    }
  })
  console.log(this.product);
  
} 
}


