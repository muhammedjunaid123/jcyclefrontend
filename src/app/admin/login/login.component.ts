import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class AdminLoginComponent implements OnDestroy{
  admin:any
  private subscribe: Subscription = new Subscription()
constructor(private _fb:FormBuilder,private _adminService:AdminService,private _router: Router,private _toastr :ToastrService ){}
adminLogin=this._fb.group({
  email:['',[Validators.required,Validators.email]],
  password:['',[Validators.required,Validators.minLength(6)]]
})
adminLog(){
  this.admin=this.adminLogin.controls
if(this.adminLogin.valid){
  this.subscribe.add(
  this._adminService.adminRegister(this.adminLogin.value)
  .subscribe({
    next:(res:any)=>{
      localStorage.setItem(environment.AdminSecrect,res.access_token.toString())
      
      this._toastr.success('LOGIN SUCCESSFUL');
     this._router.navigate(['/admin/product']);
    },
    error:(error)=>{
     this._toastr.error( error.error.message);
    
    }
  })
  )
}
}
ngOnDestroy(): void {
  this.subscribe.unsubscribe()
}
}
