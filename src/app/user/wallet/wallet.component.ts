import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/user/users.service';
import { Subscription } from 'rxjs';
import { wallet } from '../types/user.types';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent implements OnInit {
  @Input() wallet:wallet[]=[]

  constructor (private _userService:UsersService){}
ngOnInit(): void {
  console.log(this.wallet,'this is the wallet');
  
}

}
