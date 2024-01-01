import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/user/users.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent implements OnInit {
  wallet!:any
  constructor (private _userService:UsersService){}
ngOnInit(): void {
  this._userService.loadWallet().subscribe({
    next:(res)=>{
     this.wallet=res
    this.wallet=this.wallet['walletHistory']
    },error:(err)=>{
 console.log(err);
 
    }
  })
}
}
