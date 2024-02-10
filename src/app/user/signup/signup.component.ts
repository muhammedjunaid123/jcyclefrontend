import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/user/users.service';
import { user } from '../types/user.types';
import { Space, WhiteSpace } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnDestroy {
  user: any
  private subscribe: Subscription = new Subscription()
  constructor(private _fb: FormBuilder, private _userService: UsersService,private _router:Router,private _toastr:ToastrService  ) {
    console.log('signup');
  }
  protected signupForm = this._fb.group({
    name: ['', WhiteSpace.validate],
    email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9](\.?[a-z0-9]){0,}@g(oogle)?mail\.com$")]],
    Mobile: ['', [Validators.required, Validators.maxLength(10),Validators.pattern(/^\d+$/), Validators.minLength(10),WhiteSpace.validate,Space.noSpaceAllowed]],
    password: ['', [Validators.required, Validators.minLength(6),WhiteSpace.validate,Space.noSpaceAllowed]]
  })
  signup() {
    this.user = this.signupForm.controls
    if (this.signupForm.valid) {
      this.subscribe.add(
      this._userService.userRegister(this.signupForm.value)
      .subscribe({
        next: (res:any) => {                
          this._router.navigate(['otp'], { queryParams: { id: res['UserData']._id } })
        },
       
      })
      )
    }
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
