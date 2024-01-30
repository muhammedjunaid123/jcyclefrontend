import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/user/users.service';
import { Router } from '@angular/router';
import { service } from 'src/app/servicer/types/servicer.types';
import { environment } from 'src/environments/environment.development';
import { user } from '../types/user.types';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit, OnDestroy {


  constructor(private _userService: UsersService, private _router: Router, private _toastr: ToastrService,private _fb:FormBuilder) { }
  isReadOnly = true
  service!: service[]
  today=new Date()
  minDate = this.today.toISOString().split('T')[0];
  pagesize = 6
  currentPage = 1
  serviceForm!: FormGroup
  locationforapi!: any
  private subscribe: Subscription = new Subscription()
  
  ngOnInit(): void {
    this.serviceForm = this._fb.group({
      time: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required]
    })
    this.subscribe.add(   
      this._userService.getAllService().subscribe({
        next: (res: service[]) => {
          this.service = res
          console.log(this.service, 'service');
  
        },
       
      })
    )
  this.subscribe.add(
    this._userService.getLocation().subscribe({
      next: (res: any) => {
        this.locationforapi = res[0]['city']
        console.log(this.locationforapi);

      }
    })
  )
 
  }
  Refresh() {
    this.subscribe.add(
      this._userService.getAllService().subscribe({
        next: (res: service[]) => {
          this.service =  res
          console.log(this.service, 'refersh');
         
  
  
        },
      
      })
    )

  }

  razor(data: service) {
   this._router.navigate(['serviceCheckout',{id:data._id}])
  }

  search(){
    console.log(this.serviceForm.value);
    this._userService.serviceFilter(this.serviceForm.value).subscribe({
      next:(res:any)=>{

      this.service=res
      console.log(this.service,'service');
      
        
      }
    })
    
  }
  ngOnDestroy(): void {
  this.subscribe.unsubscribe()
  }

}
