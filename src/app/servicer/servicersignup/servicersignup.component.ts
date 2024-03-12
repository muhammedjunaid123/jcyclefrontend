import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/user/users.service';
import { user } from 'src/app/user/types/user.types';
import { ServicerService } from 'src/app/services/servicer/servicer.service';
import { Space, WhiteSpace } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-servicersignup',
  templateUrl: './servicersignup.component.html',
  styleUrl: './servicersignup.component.css'
})
export class ServicersignupComponent implements OnDestroy {
  user: any
  private subscribe: Subscription = new Subscription()
  constructor(private _fb: FormBuilder, private _ServiceService: ServicerService,private _router:Router,private _toastr:ToastrService  ) {
    console.log('signup');
  }
  protected signupForm = this._fb.group({
    name: ['', WhiteSpace.validate],
    email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9](\.?[a-z0-9]){0,}@g(oogle)?mail\.com$")]],
    phone: ['', [Validators.required, Validators.maxLength(10),Validators.pattern(/^\d+$/), Validators.minLength(10),WhiteSpace.validate,Space.noSpaceAllowed]],
    password: ['', [Validators.required, Validators.minLength(6),WhiteSpace.validate,Space.noSpaceAllowed]]
  })
  signup() {
    this.user = this.signupForm.controls
    if (this.signupForm.valid) {
      this.subscribe.add(
      this._ServiceService.servicerRegister(this.signupForm.value)
      .subscribe({
        next: (res:user) => {    
          this._router.navigate(['/servicer/otp'], { queryParams: { id: res._id } })
        },
       
      })
      )
    }
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
