import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/user/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: any
  constructor(private _fb: FormBuilder, private _userService: UsersService,private _router:Router,private _toastr:ToastrService  ) {
    console.log('signup');

  }
  protected signupForm = this._fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    Mobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })
  signup() {
    this.user = this.signupForm.controls
    if (this.signupForm.valid) {
      this._userService.userRegister(this.signupForm.value)
      .subscribe({
        next: (res:any) => {    
          this._router.navigate(['otp'], { queryParams: { id: res.id } })
        },
        error: (error:any) => {
          console.log(error);
          
          this._toastr.error( error.error.message);
        }
      })
    }
  }
}
