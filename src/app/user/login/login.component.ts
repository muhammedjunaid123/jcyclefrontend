import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/user/users.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
constructor(private _fb:FormBuilder,private _userService:UsersService,private _toastr:ToastrService, private _router: Router){}
user:any
login=this._fb.group({
  email:['',[Validators.required,Validators.email]],
  password:['',[Validators.required,Validators.minLength(6)]]
})
Login(){
this.user=this.login.controls
if(this.login.valid){
 this._userService.userLogin(this.login.value)
 .subscribe({
  next: (res:any) => {
    localStorage.setItem(environment.UserSecret, res.access_token.toString());
    this._toastr.success('LOGIN SUCCESSFUL');
    this._router.navigate([''])
  },
  error:(error:any)=>{    
    this._toastr.error( error.error.message);
   
   }
  
})
  
}
}
}
