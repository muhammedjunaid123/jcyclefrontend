import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { address } from '../types/user.types';
import { UsersService } from 'src/app/services/user/users.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent  {
  @Input() addressArr!: address[]
  pSize = 2
  currentPage = 1
  
 


}
